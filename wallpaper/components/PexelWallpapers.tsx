import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PexelResponse, Photo } from "../types/photo";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const uri = `https://api.pexels.com/v1/search?query=mobile wallpapers@orientation=portrait`;

const { width } = Dimensions.get("screen");
const _imageWidth = width * 0.7;
const _imageHight = _imageWidth * 1.76;
const _spacing = 12;

const BackdropPhoto = ({
  item,
  index,
  scrollX,
}: {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const styleZ = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });
  // const absoluteFill = {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  // };
  return (
    <Animated.Image
      src={item.src.large}
      style={[StyleSheet.absoluteFill, styleZ]}
      blurRadius={50}
    />
  );
};

const CPhoto = ({
  item,
  index,
  scrollX,
}: {
  item: Photo;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const styleZ = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Scale the item according to focus scrollX.value
          scale: interpolate(
            scrollX.value,
            // Do it for current item's left and right item
            [index - 1, index, index + 1],
            // Scale from left 1.4, center 1 and right 1.4
            [1.4, 1, 1.4]
          ),
        },
        {
          // Rotate the item according to focus scrollX.value
          rotate: `${interpolate(
            scrollX.value,
            // Do it for current item's left and right item
            [index - 1, index, index + 1],
            // Rotate from left 10 deg, center 0 and right -10 deg
            [10, 0, -10]
          )}deg`, // Rotate in deg
        },
      ],
    };
  });
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHight,
        overflow: "hidden",
        borderRadius: 16,
      }}
    >
      <Animated.Image src={item.src.large} style={[{ flex: 1 }, styleZ]} />
    </View>
  );
};

const PexelWallpapers = () => {
  const { data, isLoading } = useQuery<PexelResponse>({
    queryKey: ["wallpapers"],
    queryFn: async () => {
      const res = await fetch(uri, {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXEL_API_KEY,
        },
      }).then((res) => res.json());
      // console.log(JSON.stringify(res));
      return res;
    },
  });

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    // e.contentOffset.x is how much we have scrolled from the start of the scroll view
    // And divided by _imageWidth + _spacing will give in which image we are focusing on
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {isLoading && <ActivityIndicator size={"large"} />}
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos.map((photo, index) => (
          <BackdropPhoto
            key={index}
            item={photo}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </View>
      <Animated.FlatList
        horizontal
        data={data?.photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return <CPhoto item={item} index={index} scrollX={scrollX} />;
        }}
        // flexGrow to take largest children's height
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        // This causes the scroll view to stop at multiples of the value of `snapToInterval`
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={"fast"}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // 16.6ms
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PexelWallpapers;
