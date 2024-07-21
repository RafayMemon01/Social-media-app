import { create } from "zustand";

const useAuthStore = create((set)=>({
    user: JSON.parse(
        localStorage.getItem("instUser") || "null"
    ),
    login:(user)=>set({user}),
    logout:()=>set({user:null}),
    setUser:(user)=>set({user})
}))

export default useAuthStore;


// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: JSON.parse(localStorage.getItem("instUser") || "null"),
//   login: (user) => {
//     localStorage.setItem("instUser", JSON.stringify(user));
//     set({ user });
//   },
//   logout: () => {
//     localStorage.removeItem("instUser");
//     set({ user: null });
//   },
//   setUser: (user) => set({ user }),
// }));

// export default useAuthStore;
