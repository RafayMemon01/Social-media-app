import { useToast } from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authstore';

const useLogOut = () => {

    const logout = useAuthStore((state)=>state.logout)

    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToasr = useToast()
    const handleLogOut = async () => {
        try {
            const result = await signOut();
            if(result){
                localStorage.removeItem("instUser");
                logout()
            }
            } catch (error) {
            showToasr({
                title: "Error",
                status: "error",
                description:"Failed to logout"
              });
            
        }
    }

  return {handleLogOut, isLoggingOut}
}

export default useLogOut
