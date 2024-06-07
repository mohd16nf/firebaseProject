import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import Card from '../components/Card';

function Home() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    async function fetchBookLists() {
      try {
        const docs = await firebase.getBookLists();
        const bookList = docs.docs.map(doc => {
          const data = doc._document.data.value.mapValue.fields;
          return {
            email: data.email.stringValue,
            bookName: data.name.stringValue,
            coverPic: data.coverPic.stringValue,
            username: data.userName.stringValue,
            price: data.price.stringValue,
            isbnNumber: data.isbnNumber.stringValue,
          };
        });

        setBooks(bookList);
      } catch (error) {
        console.error('Error fetching book lists:', error);
      }
    }

    fetchBookLists();
  }, [firebase]);

  useEffect(() => {
    books.forEach(async (book, index) => {
      if (book.coverPic) {
        try {
          const url = await firebase.getImageURL(book.coverPic);
          setBooks(prevBooks => {
            const updatedBooks = [...prevBooks];
            updatedBooks[index].imageURL = url;
            return updatedBooks;
          });
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }
    });
  }, [books, firebase]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        {books.map((book, index) => (
          <Card
            key={index}
            email={book.email}
            bookName={book.bookName}
            coverPic={book.imageURL}
            username={book.username}
            price={book.price}
            isbnNumber={book.isbnNumber}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
