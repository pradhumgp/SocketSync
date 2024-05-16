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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();

  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  }
  const postDetails = (pic) => {
   console.log(pic);
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
            value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
            value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
            value={password}
            type={show? "text": "password"}
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

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input
        value={confirmPassword}
            type={show? "text": "password"}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InputRightElement w="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleShowHide}>
            {show? "Hide": "Show"}
        </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type='file'
          p='1.5'
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
      colorScheme="blue"
      w="100%"
      mt='15'
      onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
