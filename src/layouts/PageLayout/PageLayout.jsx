import { Box, Flex } from '@chakra-ui/react'
import React, { Children } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../../components/SideBar/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';
const PageLayout = ({children}) => {

    const pathName = useLocation().pathname;
    const {user,loading,error} = useAuthState(auth)
    const canRenderSideBar = pathName!=='/auth' && user;
    const canRandarNavbar = pathName!=='/auth' && !user;
  return (
    <Flex>
      {canRenderSideBar? (<Box w={{base:"70px",md:"240px"}}>
            <SideBar/>
      </Box>) : null}

      {/* NavBar */}
      {canRandarNavbar? (
        <Navbar/>
      ):null}

      <Box flex={1} w={{base:"calc(100%-70px)",md:"calc(100%-240px"}}>
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout
