import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useCallback, memo } from "react";
import useNewsData from "../../customhooks/useNewsData";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;
const IMAGE_HEIGHT = 115;

const NewsCard = memo(({ item, onPress }) => (
  <Pressable onPress={() => onPress(item)}>
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={{
          uri: item.urlToImage,
          cache: "force-cache",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.date}>02:22 PM , 14 Jul 2024</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title || "No title available"}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description || "No description available"}
        </Text>
      </View>
    </View>
  </Pressable>
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

const Cards = () => {
  const navigation = useNavigation();
  const { data: cards, loading, error } = useNewsData();

  const handlePress = useCallback(
    (article) => {
      navigation.navigate("NotificationDetails", { article });
    },
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.url || item.title, []);

  const renderItem = useCallback(
    ({ item }) => <NewsCard item={item} onPress={handlePress} />,
    [handlePress]
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: 230,
      offset: 230 * index,
      index,
    }),
    []
  );

  if (loading && !cards?.length) return <LoadingView />;
  if (error) return <ErrorView message="Error loading news" />;
  if (!cards?.length) return <ErrorView message="No news available" />;

  return (
    <FlatList
      data={cards}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      windowSize={5}
      initialNumToRender={4}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 230,
    borderRadius: 8,
    backgroundColor: "fff",
    marginHorizontal: 20,
    marginBottom: 20,

  },
  listContainer: {
    paddingVertical: 20,
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
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    width: "100%",
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  date: {
    fontSize: 10,
    fontFamily: "Outfit",
    fontWeight: "400",
    color: "#666",
  },
  title: {
    width: CARD_WIDTH - 40,
    fontSize: 14,
    fontFamily: "Outfit",
    fontWeight: 600,
    marginVertical: 5,
  },
  description: {
    width: CARD_WIDTH - 40,
    fontSize: 11,
    fontFamily: "Outfit",
    fontWeight: 400,
    color: "#666",
  },
});

export default memo(Cards);
