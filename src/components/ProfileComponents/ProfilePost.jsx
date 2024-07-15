import { Avatar, Box, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedsComponent/FeedPost/PostFooter";
import userProfileStore from "../../store/userProfileStore";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = userProfileStore((state)=>state.userProfile)
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          bottom={0}
          right={0}
          bg={"blackAlpha.700"}
          transition={"all .3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          h={"100%"}
          w={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose} 
      isCentered={true}
      size={{base:"3xl",md:"5xl"}}
      >
        <ModalOverlay />
        <ModalContent>
         
          <ModalCloseButton />
          <ModalBody
          bg={'black'}
          pb={5}
          >
            <Flex gap={5} w={{base:'90%',sm:'70%',md:"full"}} mx={'auto'}>
                <Box
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}
                >
                    <Image src={post.imageURL} alt="Profile Post" />
                </Box>
                <Flex flex={1} flexDirection={'column'} px={10} display={{base:'none',md:'flex'}}>
                    <Flex justifyContent={'space-between'}>

                    <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
                        <Avatar src={userProfile.profilePicURL}  size={'sm'} name="RHM Web Developer"/>
                        <Text fontSize={12} fontWeight={'bold'}>{userProfile.userName}</Text>
                    </Flex>
                    <Box _hover={{bg:'whiteAlpha.300',color:'red.600'}} borderRadius={4} p={1}>
                        <MdDelete size={20} cursor={'pointer'}/>
                    </Box>
                    </Flex>
                    <Divider my={4} bg={'gray.500'}/>
                    <VStack w={'full'} alignItems={'start'} gap={5} maxH={'350px'} overflowY={'auto'}>
                        <Comment
                        createdAt='1d ago'
                        username="RHM Web"
                        profilePic="/profilepic.png"
                        comment="This is a comment"
                        />
                        <Comment
                        createdAt='1d ago'
                        username="RHM Web"
                        profilePic="/profilepic.png"
                        comment="This is a comment"
                        />
                        <Comment
                        createdAt='1d ago'
                        username="RHM Web"
                        profilePic="/profilepic.png"
                        comment="This is a comment"
                        />

                    </VStack>
                    <Divider my={4} bg={'gray.800'} />
                     <PostFooter isProfilePage={true} />
                </Flex>

            </Flex>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
