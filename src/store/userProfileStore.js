import { create } from "zustand";

const userProfileStore = create((set)=>({
    userProfile: null,
    setUserProfile: (userProfile)=>set({userProfile}),
    addPost: (post)=>set((state)=>({
        userProfile: {...state.userProfile, posts: [post.id ,...state.userProfile.posts]}
    }))
})) 

export default userProfileStore;
