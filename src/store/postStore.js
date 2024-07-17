import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
