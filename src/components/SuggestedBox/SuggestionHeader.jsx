import { Avatar, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authstore";
import { Link } from "react-router-dom";

const SuggestionHeader = () => {
  const authUser = useAuthStore((state)=>state.user)
  const {handleLogOut,isLoggingOut} = useLogOut();


  // const checkingUserAuth = !authUser && isLoggingOut;
  // if (checkingUserAuth) return <PageLayoutSpinner />;


  if (!authUser) {
    return <PageLayoutSpinner/>; // or any other loading indicator
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.userName}`}>
        <Avatar  size={"md"} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.userName}`}>

        <Text fontSize={"12"} fontWeight={"bold"}>
          {authUser.userName}
        </Text>
        </Link>
      </Flex>

      <Button
        size={'xs'}
        background={'transparent'}
        _hover={{background:"transparent"}}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.500"}
        cursor={"pointer"}
        onClick={handleLogOut}
        isLoading={isLoggingOut}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestionHeader;
const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
      <Spinner size={'sm'} />
    </Flex>
  )
};
