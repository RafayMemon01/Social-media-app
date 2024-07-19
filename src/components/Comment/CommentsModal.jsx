import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "./Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose,post }) => {

  const commentRef = useRef(null)
  const {handlePostComment,isCommenting} = usePostComment()
  const commentContainerRef = useRef(null)

  const handleCreateComment = async (e) =>{
    e.preventDefault()
    await handlePostComment(post.id,commentRef.current.value)
    commentRef.current.value = ""
  }
  useEffect(()=>{
    const scrollToBottom = () => {
      if(commentContainerRef.current){
        commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
      }
    };
    if(isOpen){
      scrollToBottom()
    }
  },[isOpen, post.comments.length])
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentContainerRef}
          >
            {post.comments.map((comment,idx) => (
              <Comment key={comment.id||idx} comment={comment} />
            ))}

          </Flex>
          <form onSubmit={handleCreateComment} style={{ marginTop: "1rem" }}>
            {/* <Input placeholder='Comment' size={"sm"} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4}>
								Post
							</Button>
						</Flex> */}
            <InputGroup>
              <Input
                variant={"flushed"}
                placeholder="Add a comment..."
                fontSize="14"
                ref={commentRef}
              />
              <InputRightElement>
                <Button
                  fontSize={"14"}
                  color={"blue.500"}
                  fontWeight={600}
                  cursor={"pointer"}
                  _hover={{ color: "white" }}
                  bg={"transparent"}
                  type="submit"
                  isLoading={isCommenting}
                >
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
