import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firbase';
import Cards from '../components/Cards';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {
    
    const firbase = useFirebase();
    const [books, setbooks] = useState([]);
    
    useEffect(() => {
      firbase.listAllBooks().then(books => setbooks(books.docs))
    }, [firbase])
    
  return (
    <div><h3>List Books here</h3>
    <CardGroup className='container mt-5'>
        {books.map(book => 
          <Cards key={book.id} id={book.id} link={`/book/view/${book.id}`} {...book.data()}/>
        )}
    </CardGroup>
    </div>
  )
}

export default Home