import { useState } from "react"
import useShowToast from '../hooks/useShowToast'
import { collection, query } from "firebase/firestore"
import { where } from 'firebase/firestore'
// import { collection } from 'firebase/firestore'
import { fireStore } from "../firebase/firebase"
import { getDocs } from 'firebase/firestore'

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false)  
    const [user, setUser] = useState(null)
    const showToast = useShowToast()

    const getUserProfile = async (username)=>{
        setIsLoading(true)
        setUser(null)
        try {
            const q = query(collection(fireStore, "users"), where("userName", "==", username))
            const querySnapshot = await getDocs(q)
            if(querySnapshot.empty){
                showToast("Error", "User not found", "error")
                setUser(null)
                return
            }
            querySnapshot.forEach((doc)=>{
                setUser(doc.data())
            })
        } catch (error) {
            showToast("Error", error.message, "error")
            setUser(null)
        }finally{
            setIsLoading(false)
        }
    }


    return{
        isLoading,
        getUserProfile,
        user,
        setUser
    }

}

export default useSearchUser
