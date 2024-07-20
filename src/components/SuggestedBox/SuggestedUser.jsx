import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authstore";
import { Link } from "react-router-dom";


const SuggestedUser = ({ user ,setUser }) => {
  const {isUpdating, isFollowings, handleFollowUser} = useFollowUser(user?.uid)
  const authUser = useAuthStore(state => state.user)

  const handleFollow = async ()=>{
    await handleFollowUser()
    setUser({
      ...user,
      followers: isFollowings ? user?.followers?.filter(follower => follower !== authUser?.uid) : [...user?.followers, authUser?.uid]
    })
  }


  
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Link to={`/${user?.userName}`} style={{ textDecoration: 'none' }}  >

      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user?.profilePicURL} name={user?.fullName} size={"md"} />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Box fontSize={12} fontWeight={"bold"}>
            {user?.userName}
          </Box>
          <Box fontSize={11} color={"gray.500"}>
            {user?.followers?.length} followers
          </Box>
        </VStack>
      </Flex>
      </Link>

      {
        authUser?.uid !== user?.uid && (
          <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ color: "white" }}
        onClick={handleFollow}
        isLoading={isUpdating}
      >
        {isFollowings ? "Unfollow" : "Follow"}
      </Button>)}
    </Flex>
  );
};

export default SuggestedUser;
