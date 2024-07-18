import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),



  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>{
                if(post.id === postId){
                  return {...post, comments: [...post.comments, comment]}
        }}
      ),
    })),


    
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
