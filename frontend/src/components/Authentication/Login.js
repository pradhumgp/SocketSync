import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  }

  const submitHandler = () => {
    console.log('submit');
  }

  return (
    <VStack
    //   divider={<StackDivider borderColor="gray.200" />}
      spacing="5px"
      align="stretch"
    >

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
            type={show? "text": "password"}
            value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement w="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleShowHide}>
            {show? "Hide": "Show"}
        </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
      colorScheme="blue"
      w="100%"
      mt='15'
      onClick={submitHandler}
      >
        Login
      </Button>

      <Button
      variant="solid"
      colorScheme="red"
      w="100%"
      onClick={()=>{
        setEmail("guest@example.com");
        setPassword("1234");
      }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;