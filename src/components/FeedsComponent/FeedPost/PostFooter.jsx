import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../../assets/contants'

const PostFooter = ({username}) => {
    const [isLike, setIsLike] = useState(false)
    const [likeCount, setCountLike] =useState(0)

    const handleLike = () => {
        if(isLike){
            setIsLike(false)
            setCountLike(likeCount-1)
        }else{
            setIsLike(true)
            // eslint-disable-next-line no-console
            setCountLike(likeCount+1)
        }
    }
  // eslint-disable-next-line no-console
  return (
    <Box mb={10}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={'2'}>
        <Box cursor={'pointer'} onClick={handleLike}>
          {!isLike?(<NotificationsLogo/>):(<UnlikeLogo/>)}
        </Box>
        <Box cursor={'pointer'}>
          <CommentLogo/>
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likeCount} likes
      </Text>
      <Text fontSize={'sm'} fontWeight={700}>
        {username}__
        <Text as={'span'} fontWeight={400}>feeling good</Text>
      </Text>
      <Text color={'gray'} fontSize={'sm'}>
        View all 1,000 comments
      </Text>
      <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
        <InputGroup>
        <Input variant={'flushed'} placeholder='Add a comment...' fontSize='14' />
        <InputRightElement>
        <Button fontSize={'14'} color={'blue.500'} fontWeight={600} cursor={'pointer'} _hover={{color:"white"}} bg={'transparent'}>Post</Button>
        </InputRightElement>
        </InputGroup>
      </Flex>


    </Box>
  )
}

export default PostFooter
