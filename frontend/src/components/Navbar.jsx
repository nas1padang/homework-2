import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const modalBackground = useColorModeValue('white', 'gray.700');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            My Website
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/")
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent background={modalBackground}>
      <ModalHeader>Login to Your Account</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              focusBorderColor="blue.500"
            />
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderTopWidth="1px"
        borderColor={useColorModeValue('gray.100', 'gray.600')}
      >
        <Button colorScheme="blue" w="full" mb={3} type="submit" form="login-form">
          Log In
        </Button>
        <Link to="/register" onClick={onClose}>
          <Text fontSize="sm" color={secondaryTextColor} textAlign="center">
            Don’t have an account? <Text as="span" color="blue.500" fontWeight="semibold">Sign Up</Text>
          </Text>
        </Link>
      </ModalFooter>
    </ModalContent>
  </form>
</Modal>
    </Flex>
  );
};

export default Navbar;
