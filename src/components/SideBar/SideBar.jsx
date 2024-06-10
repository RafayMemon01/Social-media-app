import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/contants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const SideBar = () => {
  const sideBarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: "Notifications",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
    },
    {
      icon: <Avatar size={"sm"} name="RHM" src="/profilepic.png" />,
      text: "profile",
      link: "/RHMwebSolutions",
    },
  ];
  return (
    <Box
      height={"100vh"}
      borderRight={"2px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      zIndex={1}
      px={{ base: "2", md: "4" }}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer0"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {sideBarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                to={item.link || null}
                as={RouterLink}
                display={"flex"}
                alignItems={'center'}
                gap={4}
                _hover={{bg:'whiteAlpha.400'}}
                borderRadius={6}
                p={2}
                cursor={"pointer"}
                w={{base:'10',md:'full'}}
                justifyContent={{base:"center",md:"flex-start"}}
              >
                {item.icon}
                <Box display={{base:"none",md:"block"}}>

                  {item.text}
                </Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>
        <Tooltip
              label={'Logout'}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                to={'/auth'}
                as={RouterLink}
                display={"flex"}
                alignItems={'center'}
                gap={4}
                _hover={{bg:'whiteAlpha.400'}}
                borderRadius={6}
                p={2}
                cursor={"pointer"}
                w={{base:'10',md:'full'}}
                justifyContent={{base:"center",md:"flex-start"}}
                marginTop={'auto'}
              >
                <BiLogOut size={25}/>
                <Box display={{base:"none",md:"block"}}>
                  Logout
                </Box>
              </Link>
            </Tooltip>
      </Flex>
    </Box>
  );
};

export default SideBar;
