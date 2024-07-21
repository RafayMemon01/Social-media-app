import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authstore";
import { updateDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { arrayUnion } from "firebase/firestore";
import usePostStore from "../store/postStore";
import { doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const usePostComment = () => {
  const showToast = useShowToast();
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!authUser) {
      showToast("Error", "You must be logged in to comment", "error");
    }
    setIsCommenting(true);
    const newComment = {
      id: uuidv4(),
      comment,
      createdBy: authUser?.uid,
      createdOn: Date.now(),
      postId,
    };
    try {
        const postRef = doc(fireStore, "posts", postId); 
      await updateDoc(postRef,
        {
          comments: arrayUnion(newComment),
        });
      addComment(postId, newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally{
        setIsCommenting(false)}
  };
  return {
    handlePostComment,
    isCommenting,
  };
};

export default usePostComment;
