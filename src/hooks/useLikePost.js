import React, { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authstore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'

const useLikePost = (post) => {
    const [isLoading,setIsLoading] = useState(false)
    const showToast = useShowToast()
    const authUser = useAuthStore((state) => state.user)
    const [likes, setLikes]= useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(post.likes.includes(authUser.uid))

    const handleLikePost = async ()=>{
        if(!authUser){
            return showToast("Login Please","You have to login first", "error")
        }
        if(isLoading) return;
        setIsLoading(true)
        try {
            const postRef = doc(fireStore,'posts',post.id)
            await updateDoc(postRef, {
                likes: isLiked?arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            setIsLiked(!isLiked)
            isLiked?setLikes(likes-1):setLikes(likes+1)

        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }
    return {handleLikePost, isLoading, likes, isLiked}
}

export default useLikePost
