import { Avatar, Box, Flex, Text } from '@chakra-ui/react'


const PostHeader = ({avatar, username}) => {
  return (
    <Flex justifyContent={"space-between"}alignItems={'center'} w={'full'} my={3}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={avatar} alt={username} size={'sm'} />
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
            {username}
            <Box color={'gray.500'}>
                -2h
            </Box>
        </Flex>
      </Flex>
      <Box cursor={'pointer'} 
      >
        <Text 
        color={'blue.500'}
        fontSize={12}
        fontWeight={'bold'}
        _hover={{
            color:'white'
        }}
        transition={'.2s ease-in-out'}
        >
            Unfollow</Text>
        </Box>
    </Flex>
  )
}

export default PostHeader
