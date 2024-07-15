import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import userProfileStore from "../store/userProfileStore";
import { query, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { getDocs } from "firebase/firestore";

const useGetUserPosts = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const userProfile = userProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPost = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(fireStore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [setPosts, userProfile, showToast]);
  return {
    isLoading,
    posts,
  };
};

export default useGetUserPosts;
