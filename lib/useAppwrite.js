import { useEffect, useState } from "react";
// import { exHolder } from "../testing";
import { Alert } from "react-native";
import { getAllPosts } from "./appwrite";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      //get data from appwrite/supabase
      //set data in response
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  //   console.log(data)
  return { data, isLoading, refetch };
};

export default useAppwrite;
