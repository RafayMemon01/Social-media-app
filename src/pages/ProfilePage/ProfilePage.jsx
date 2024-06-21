import { Container, Flex } from "@chakra-ui/react"
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader"
import ProfileTabs from "../../components/ProfileComponents/ProfileTabs"
import ProfilePosts from "../../components/ProfileComponents/ProfilePosts"

const ProfilePage = () => {
  return (
    <Container maxWidth={'container.lg'} py={5}>
        {/* ---------------------Profile Header-------------------- */}
      <Flex
      py={10}
      px={4}
      pl={{base:4,md:10}}
      w={'full'}
      flexDirection={'column'}
      mx={'auto'}
      >
        <ProfileHeader/>
      </Flex>

        {/* ---------------------Profile Tabs and Posts-------------------- */}
      <Flex
      px={{base:2,sm:4}}
      maxW={'full'}
      mx={'auto'}
      borderTop={'1px solid'}
      borderColor={'whiteAlpha.400'}
      direction={'column'}
      >
        <ProfileTabs/>
        <ProfilePosts/>
      </Flex>
    </Container>
  )
}

export default ProfilePage
