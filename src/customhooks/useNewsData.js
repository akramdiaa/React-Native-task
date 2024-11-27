import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

const useNewsData = (query = "technology") => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
  });
  
  const pageSize = 10;

  const fetchNews = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${query}&pageSize=${pageSize}&apiKey=7c5706af71984ff0b5da5e961cfa4acb`;

      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();

      if (result.status === 'error') {
        throw new Error(result.message);
      }

      if (!result.articles?.length) {
        setState(prev => ({ 
          ...prev, 
          loading: false,
          data: []
        }));
        return;
      }
        
      // Filter out articles without valid images
      const validArticles = result.articles.reduce((acc, article) => {
        if (article.urlToImage?.startsWith('http')) {
          acc.push({
            ...article,
            id: article.url,
            urlToImage: article.urlToImage
          });
        }
        return acc;
      }, []);

      setState(prev => ({
        data: validArticles,
        loading: false,
        error: null,
      }));

    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: err,
        loading: false 
      }));
      Alert.alert(
        "Error",
        "Failed to fetch news. Please try again later.",
        [
          { text: "OK" },
          { text: "Retry", onPress: () => fetchNews() }
        ]
      );
    }
  }, [query]);

  useEffect(() => {
    fetchNews();
  }, [query]);

  const { data, loading, error } = state;

  return {
    data,
    loading,
    error,
  };
};

export default useNewsData;