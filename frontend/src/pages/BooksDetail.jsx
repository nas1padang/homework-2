import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
        toast({
          title: "An error occurred.",
          description: "Unable to load book details.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchBook();
  }, [id, toast]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
      toast({
        title: "An error occurred.",
        description: "Failed to delete book.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} shadow="xl" rounded="md" bg={bgColor}>
      {isLoading ? (
        <Skeleton height="300px" my="6" />
      ) : (
        <Flex direction={{ base: "column", md: "row" }} align="center">
          <Box
            w={{ base: "100%", md: "300px" }}
            mb={{ base: "4", md: "0" }}
            mr={{ md: "8" }}
            boxShadow="lg"
            rounded="md"
            overflow="hidden"
          >
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
              objectFit="cover"
              w="100%"
              h="auto"
              transition="transform 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)"
              }}
            />
          </Box>
          <Box flex="1">
            <Heading as="h1" size="xl" mb={2}>
              {book.title}
            </Heading>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              By {book.author}
            </Text>
            <Text fontSize="md" color="gray.500">
              Published by {book.publisher}
            </Text>
            <Text fontSize="md" color="gray.500" mb={4}>
              {book.year} · {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {localStorage.getItem('token') && (
        <HStack mt={4} justifyContent="flex-end">
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red" variant="outline">
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDeleteBook} colorScheme="red">
                Confirm Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link to={`/editbook/${id}`}>
            <Button colorScheme="teal">Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}
