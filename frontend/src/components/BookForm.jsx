import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
  useColorModeValue,
  Box,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const formBackground = useColorModeValue('white', 'gray.700');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box
      p={8}
      boxShadow="base"
      rounded="lg"
      bg={formBackground}
      maxW="2xl"
      mx="auto"
    >
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <VStack spacing={4} flex="1">
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                variant="filled"
                name="title"
                required
                defaultValue={bookData?.title}
                placeholder="Enter book title"
              />
            </FormControl>
            <FormControl id="author">
              <FormLabel>Author</FormLabel>
              <Input
                variant="filled"
                name="author"
                required
                defaultValue={bookData?.author}
                placeholder="Enter author's name"
              />
            </FormControl>
            <FormControl id="publisher">
              <FormLabel>Publisher</FormLabel>
              <Input
                variant="filled"
                name="publisher"
                required
                defaultValue={bookData?.publisher}
                placeholder="Enter publisher"
              />
            </FormControl>
            <FormControl id="year">
              <FormLabel>Year</FormLabel>
              <Input
                variant="filled"
                name="year"
                type="number"
                required
                defaultValue={bookData?.year}
                placeholder="Enter year of publication"
              />
            </FormControl>
            <FormControl id="pages">
              <FormLabel>Pages</FormLabel>
              <Input
                variant="filled"
                name="pages"
                type="number"
                required
                defaultValue={bookData?.pages}
                placeholder="Enter number of pages"
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} align="stretch" flex="1">
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                p={1}
                variant="flushed"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
            {selectedImage && (
              <Image
                boxSize="200px"
                objectFit="cover"
                src={selectedImage}
                alt="Selected book cover"
                borderRadius="md"
                alignSelf="center"
              />
            )}
            <Spacer />
            <Button
              colorScheme="teal"
              px={10}
              type="submit"
              size="lg"
              alignSelf="end"
            >
              {bookData ? "Edit Book" : "Create Book"}
            </Button>
          </VStack>
        </Flex>
      </form>
    </Box>
  );
}