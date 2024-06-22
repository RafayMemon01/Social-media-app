import { Flex, Image, Text } from "@chakra-ui/react"

const GoogleAuth = () => {
  return (
    <>
      <Flex alignItems={"center"} cursor={"pointer"}>
            <Image
              draggable={false}
              src="/google.png"
              w={5}
              alt="Google Logo"
            />
            <Text color={"blue.500"} mx={2}>
              Log in with Google
            </Text>
          </Flex>
    </>
  )
}

export default GoogleAuth
