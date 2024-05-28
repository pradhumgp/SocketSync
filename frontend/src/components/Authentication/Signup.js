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
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleShowHide = () => {
    setShow(!show);
  }
  const postDetails = (pic) => {
    setLoading(true);
    if(pic === undefined) {
      toast({
        title: 'please select an image!.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    if(pic.type === "image/jpeg" || pic.type === "image/png"){
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "socketsync");
      data.append("cloud_name", "dcns64k3i");
      fetch("https://api.cloudinary.com/v1_1/dcns64k3i/image/upload",{
        method: "post",
        body: data
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
        toast({
          title: 'image is successfully uploaded!.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    }
    else{
      toast({
        title: 'please select an image!.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
    }
  }
  const submitHandler = async() => {
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: 'Please fill all the fields!.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return;
    }
    if(password !== confirmPassword){
      toast({
        title: 'Passwords do no match, please check!.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
    }
    try {

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        "/api/user/register",
        { name, email, password, pic},
        config
      );

      toast({
        title: 'Registration successful!.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error occurred while registration!.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
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
      isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
