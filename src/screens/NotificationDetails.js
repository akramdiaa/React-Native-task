import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = 167;

function NotificationDetails({ route }) {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: article.urlToImage,
            cache: "force-cache",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.timeWrapper}>
            <Text style={styles.time}>02:22 PM, 14 Jul 2024</Text>
          </View>

          <Text style={styles.title}>
            {article.title || "No title available"}
          </Text>

          <Text style={styles.content}>
            {/* the api is  limits the content in the response
            so the rest of the content of the article will appear like [+number chars]
            */}
            {article.content || "No content available"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    padding: 20,
  },
  timeWrapper: {
    width: 140,
    height: 22,
    borderRadius: 6,
    justifyContent: "center",
    marginBottom: 15,
  },
  time: {
    fontSize: 11,
    color: "#666",
    fontFamily: "Outfit",
    fontWeight: "400",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    fontFamily: "Outfit",
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: "Outfit",
    fontWeight: "400",
  },
  content: {
    fontSize: 13,
    color: "#666",
    lineHeight: 16,
    fontFamily: "Outfit",
    fontWeight: "400",
  },
});

export default memo(NotificationDetails);
