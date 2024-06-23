import { useToast } from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

const useLogOut = () => {

    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToasr = useToast()
    const handleLogOut = async () => {
        try {
            const result = await signOut();
            if(result){
                localStorage.removeItem("instUser");
                console.log("Logout")
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
