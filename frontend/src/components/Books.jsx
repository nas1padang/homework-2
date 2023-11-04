import React from 'react';
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`} style={{ textDecoration: 'none' }}>
      <Box
        key={id}
        m={4}
        p={4}
        cursor='pointer'
        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
        borderRadius='lg'
        transition='transform 0.2s, box-shadow 0.2s'
        _hover={{
          transform: 'scale(1.05)',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        <VStack spacing={4}>
          <Image
            src={`http://localhost:8000/${image}`}
            alt={`Cover of ${title}`}
            objectFit='cover'
            borderRadius='md'
            fallbackSrc='https://via.placeholder.com/150'
            boxSize='150px' // menetapkan ukuran kotak untuk gambar
          />
          <Heading size='md' noOfLines={2} textAlign='center'>
            {title} ({year})
          </Heading>
          <Text fontWeight='bold'>{author}</Text>
          <Text fontSize='sm' color='gray.600'>
            {publisher}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}
