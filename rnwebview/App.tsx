import React, {useState, useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';

export default function App() {
  const webViewRef = useRef<any>();
  const [isLoading, setLoading] = useState(false);

  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack();
      return true;
    } catch (err: any) {
      console.log('[handleBackButtonPress] Error : ', err.message);
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <WebView
        originWhiteList={['*']}
        source={{uri: 'https://google.com'}}
        style={styles.container}
        ref={webViewRef}
        onLoadStart={syntheticEvent => {
          setLoading(true);
        }}
        onShouldStartLoadWithRequest={event => {
          if (event.navigationType === 'click') {
            if (!event.url.match(/(google\.com\/*)/)) {
              Linking.openURL(event.url);
              return false;
            }
            return true;
          } else {
            return true;
          }
        }}
        onLoadEnd={syntheticEvent => {
          setLoading(false);
        }}
      />
      {isLoading && (
        <ActivityIndicator
          color="#234356"
          size="large"
          style={styles.loading}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#234356',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
