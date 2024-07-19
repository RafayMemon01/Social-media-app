import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authstore";
import userProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = userProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser?.followings.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(fireStore, "posts"),
        where("createdBy", "in", authUser.followings)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const getPostScore = (post) => {
          const recencyScore = new Date().getTime() - post.createdAt;
          const interactionScore = post.likes.length + post.comments.length;
          const userInteractionScore = post.likes.includes(authUser.id)
            ? 10
            : 0;

          // A higher score means a more relevant post
          return (
            recencyScore * -1 + interactionScore * 2 + userInteractionScore
          );
        };

        feedPosts.sort((a, b) => getPostScore(b) - getPostScore(a));
        setPosts(feedPosts);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) {
      getFeedPosts();
    }
  }, [authUser, showToast, setPosts, setUserProfile]);
  return {
    isLoading,
    posts,
  };
};

export default useGetFeedPosts;
