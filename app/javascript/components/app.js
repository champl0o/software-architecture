import { ChakraProvider } from '@chakra-ui/react'
import Root from './root'

function App() {
  return (
    <ChakraProvider>
      <Root/>
    </ChakraProvider>
  )
}

export default App