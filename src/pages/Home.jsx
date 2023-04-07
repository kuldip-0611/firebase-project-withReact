import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCrad from '../components/BookCrad';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {
    const [books,setBooks] = useState([])
    const firebase = useFirebase();
    useEffect(()=>{
        firebase.getAllBooks().then(books=>setBooks(books.docs))

    },[books,firebase])
  return (
  
    <div className='container m-3'>
        
      <CardGroup>
       {
            
            books.map(book=>(
                
                <BookCrad link={`/book/view/${book.id}`}  key={book.id} id={book.id} item={book.data()} />
            ))
        }
       </CardGroup>
    </div>
  )
}

export default Home
