import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

const PageLayout = ({ children }) => {
  const pathName = useLocation().pathname;
  const [user, loading, error] = useAuthState(auth); // Use array destructuring

  const canRenderSideBar = pathName !== '/auth' && user; // Show sidebar when user is authenticated and not on auth page
  const canRenderNavbar = pathName !== '/auth' && !user; // Show navbar when user is not authenticated and not on auth page

  const checkingUserAuth = !user && loading;
  if (checkingUserAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDirection={canRenderNavbar?"column":'row'}>
      {canRenderSideBar && (
        <Box  w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      )}

      {canRenderNavbar && (
        <Navbar />
      )}

      <Box mt={0} flex={1} mx={'auto'} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} flexDirection="row">
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
      <Spinner size={'xl'} />
    </Flex>
  )
};
