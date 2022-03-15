import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';

// These must be hardcoded to support the various animations needed for the effect
const HEADER_HEIGHT = 144;
const TAB_BAR_HEIGHT = 48;

const CollapsibleHeaderScreenFix = () => {
  // eslint-disable-next-line react/sort-comp
  title = 'Collapsible header tab bar';
  backgroundColor = '#3f51b5';
  appbarElevation = 0;

  const [state, setState] = useState({
    index: 1,
    routes: [
      {key: 'article', title: 'Article'},
      {key: 'contacts', title: 'Contacts'},
      {key: 'albums', title: 'Albums'},
    ],
  });

  const handleIndexChange = index => {
    setState({...state, index});
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  const renderTabOne = () => {
    return (
      <View
        style={{
          backgroundColor: 'gray',
        }}>
        {Array(40)
          .fill(0)
          .map((d, index) => {
            return <Text key={index}>{index}</Text>;
          })}
      </View>
    );
  };

  const renderTabTwo = () => {
    return (
      <View style={{backgroundColor: 'green'}}>
        {Array(80)
          .fill(0)
          .map((d, index) => {
            return <Text key={index}>{index}</Text>;
          })}
      </View>
    );
  };

  const renderTabThree = () => {
    return (
      <View style={{backgroundColor: 'blue'}}>
        {Array(120)
          .fill(0)
          .map((d, index) => {
            return <Text key={index}>{index}</Text>;
          })}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.headerCol}>
        <Text style={styles.text}>Collapsible Header</Text>
      </View>
    </View>
  );

  return (
    <CollapsibleHeader
      tabData={[[{key: '0'}], [{key: '1'}], [{key: '2'}]]}
      tabBarHeight={TAB_BAR_HEIGHT}
      headerHeight={HEADER_HEIGHT}
      renderTabItems={[renderTabOne, renderTabTwo, renderTabThree]}
      renderHeader={renderHeader}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
      navigationState={state}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
  headerRow: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#429BB8',
  },
  headerCol: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});

const CollapsibleHeader = props => {
  const {
    renderTabItems,
    tabBarHeight,
    headerHeight,
    onIndexChange,
    navigationState,
    renderHeader,
    renderTabBar,
    tabData,
    tabViewProps = {},
    flatListProps,
  } = props;

  const {routes, index: tabIndex} = navigationState;

  const scrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, scrollY, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach(item => {
      if (item.key === curRouteKey) {
        return;
      }

      if (scrollY._value < headerHeight && scrollY._value >= 0) {
        if (item.value) {
          item.value.scrollToOffset({
            offset: scrollY._value,
            animated: false,
          });
          listOffset.current[item.key] = scrollY._value;
        }
      } else if (
        scrollY._value >= headerHeight &&
        (listOffset.current[item.key] < headerHeight ||
          listOffset.current[item.key] == null) &&
        item.value
      ) {
        item.value.scrollToOffset({
          offset: headerHeight,
          animated: false,
        });
        listOffset.current[item.key] = headerHeight;
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const renderScene = ({route}) => {
    const index = navigationState.routes.findIndex(
      ({key}) => key === route.key,
    );

    const renderItem = renderTabItems[index];
    const data = tabData[index];
    const flatListPropsForTab = flatListProps?.[index];

    const windowHeight = Dimensions.get('window').height;

    const contentContainerStyle = {
      paddingTop: headerHeight,
      minHeight: windowHeight - tabBarHeight,
    };

    return (
      <>
        <View style={{height: tabBarHeight}} />
        <Animated.FlatList
          scrollToOverflowEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          contentContainerStyle={contentContainerStyle}
          data={data}
          ref={ref => {
            if (ref) {
              const found = listRefArr.current.find(e => e.key === route.key);
              if (!found) {
                listRefArr.current.push({
                  key: route.key,
                  value: ref,
                });
              }
            }
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast" // Since we prevent switching tabs during momentum, we want it to decelerate faster
          {...flatListPropsForTab}
        />
      </>
    );
  };

  const renderTabBarWithWrapper = innerProps => {
    const y = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [headerHeight, 0],
      extrapolateRight: 'clamp',
    });

    const propsToPass = {
      onTabPress: ({preventDefault}) => {
        if (isListGliding.current) {
          preventDefault();
        }
      },
      ...innerProps,
    };

    const viewStyles = {
      top: 0,
      zIndex: 1,
      position: 'absolute',
      transform: [{translateY: y}],
      width: '100%',
    };

    return (
      <Animated.View style={viewStyles}>
        {renderTabBar(propsToPass)}
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onIndexChange={onIndexChange}
        navigationState={navigationState}
        renderScene={renderScene}
        renderTabBar={renderTabBarWithWrapper}
        initialLayout={{
          height: 0,
          width: Dimensions.get('window').width,
        }}
        {...tabViewProps}
      />
    );
  };

  const renderHeaderWithWrapper = () => {
    const y = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolateRight: 'clamp',
    });

    return (
      <Animated.View
        style={[
          localStyles.header,
          {height: headerHeight},
          {transform: [{translateY: y}]},
        ]}>
        {renderHeader({})}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={localStyles.flex1}>
      <View style={localStyles.flex1}>
        {renderTabView()}
        {renderHeaderWithWrapper()}
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  header: {
    top: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: -1,
  },
  flex1: {
    flex: 1,
  },
});

export default CollapsibleHeaderScreenFix;
