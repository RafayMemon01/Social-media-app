import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import PageLayout from './layouts/PageLayout/PageLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebase'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

function App() {
  const [authUser] = useAuthState(auth)
  const toast = useToast();

  useEffect(() => {
    console.log('%cStop!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or "hack" an account, it is a scam and will give them access to your account.', 'color: black; font-size: 20px;');
    
    const handleOnline = () => {
      console.log('Online');
      toast.closeAll();
      toast({
        title: "Connection Restored",
        description: "You are back online.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    };

    const handleOffline = () => {
      console.log('Offline');
      toast({
        title: "Connection Lost",
        description: "You are currently offline. Some features may not be available.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial connection status
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return (
    <PageLayout>
    <Routes>
      <Route path='/' element={authUser?<HomePage/>:<Navigate to={"/auth"}/>}/>
      <Route path='/auth' element={!authUser?<AuthPage/>:<Navigate to={"/"}/>}/>
      <Route path='/:username' element={<ProfilePage/>}/>



    </Routes>
    </PageLayout>
  )
}

export default App
