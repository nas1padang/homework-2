import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      padding={6}
      w="100vw"
      justifyContent="center"
    >
      {books?.books?.map((book) => (
        <Books key={book.id} {...book} />
      ))}
    </Grid>
  );
}
