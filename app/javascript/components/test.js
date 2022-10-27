import { Box, Flex } from '@chakra-ui/react'

function Test() {
  return (
    <div>
      <Flex justify="space-between">
        <Box w="100px" h="100px" bg="tomato" />
        <Box w="100px" h="100px" bg="papayawhip" />
        <Box w="100px" h="100px" bg="grey" />
        <Box w="100px" h="100px" bg="teal" />
        <Box w="100px" h="100px" bg="black" />
      </Flex>
    </div>
  )
}

export default Test