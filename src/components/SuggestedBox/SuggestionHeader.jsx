import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import {Link as ReactLink} from 'react-router-dom'


const SuggestionHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={'center'} w={'full'}>
      
    <Flex alignItems={'center'} gap={2}>
        <Avatar name='RHM' size={"md"} src='/profilepic.png' />
        <Text fontSize={'12'} fontWeight={'bold'}>RHM Web Solutions</Text>

    </Flex>


    <Link as={ReactLink} to={'/auth'} fontSize={14} fontWeight={'medium'} color={'blue.500'} cursor={'pointer'} style={{textDecoration:'none'}}>Log out</Link>
    </Flex>
  )
}

export default SuggestionHeader
