import React, { useCallback, memo, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import useNewsData from "../../customhooks/useNewsData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.88;
const CARD_HEIGHT = CARD_WIDTH * 0.62;

//memoized the new card component for better preformance

const NewsCard = memo(({ item }) => (
  <View style={styles.card}>
    <Image
      source={{
        uri: item.urlToImage,
        cache: "force-cache",
      }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.overlay}>
      <View style={styles.timeWrapper}>
        <Text style={styles.time}>2 hrs later</Text>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {item.title || "No title available"}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description || "No description available"}
      </Text>
    </View>
  </View>
));

const LoadingView = memo(() => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
));

const ErrorView = memo(({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
));

const PaginationDots = memo(({ activeIndex, total }) => (
  <View style={styles.paginationContainer}>
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === activeIndex && styles.paginationDotActive,
        ]}
      />
    ))}
  </View>
));

const CardSlider = () => {
  const { data: cards, loading, error } = useNewsData();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback((event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    // the calc scroll pos start at 0px and the card width is 340
    // so 0/340 =0 gives the first index scroll again 340/340 = 1 second index
    //and so on and the math.round if we got decemail numbers
    setActiveIndex(index);
  }, []);

  //i ran into a problem with the key / id in the api
  //and some of them had the same key so i had to fix this bug
  //api issue
  const keyExtractor = useCallback((item) => item.url || item.title, []);

  const renderCard = useCallback(({ item }) => <NewsCard item={item} />, []);

  if (loading && !cards?.length) return <LoadingView />;
  if (error) return <ErrorView message="Error loading news" />;
  if (!cards?.length) return <ErrorView message="No news available" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.95}
        snapToInterval={CARD_WIDTH + 10}
        snapToAlignment="center"
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
        contentContainerStyle={styles.listContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <PaginationDots activeIndex={activeIndex} total={cards.length} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    marginRight: 10,
    marginTop: 40,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  title: {
    width: 170,
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 5,
  },
  description: {
    color: "#ffffff",
    width: 311,
    height: 32,
    fontSize: 13,
    fontWeight: "400",
  },
  overlay: {
    height: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  timeWrapper: {
    width: 63,
    height: 21.79,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 6,
    justifyContent: "center",
    marginBottom: "auto",
  },
  time: {
    color: "#ffffff",
    fontWeight: "400",
    fontSize: 11,
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#286789A1",
    marginHorizontal: 4,
    transition: "all 0.2s ease",
  },
  paginationDotActive: {
    backgroundColor: "#30A9E0",
    width: 24,
    height: 6,
    borderRadius: 3,
  },
});

export default memo(CardSlider);
