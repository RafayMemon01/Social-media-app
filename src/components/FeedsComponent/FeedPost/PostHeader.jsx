import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const PostHeader = () => {
  return (
    <Flex justifyContent={"space-between"}alignItems={'center'} w={'full'} my={3}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar src='img1.png' alt={"user profile picture"} size={'sm'} />
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            Abc User
            <Box color={'gray.500'}>
                -2h
            </Box>
        </Flex>
      </Flex>
      <Box><Text>Unfollow</Text></Box>
    </Flex>
  )
}

export default PostHeader
