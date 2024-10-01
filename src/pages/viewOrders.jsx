import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firbase'
import Cards from '../components/Cards'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const firebase = useFirebase()
    const [books, setbooks] = useState([])
    const navigate = useNavigate();
    

    useEffect(() => {
        if (firebase.isLoggedIn) {
            firebase.fatchMyOrders().then(books => setbooks(books.docs))
        }
    }, [firebase])

    const liginhere = ()=>{
      navigate('../Login')
    }
    
    if (!firebase.isLoggedIn) {
      return (
      <div>
        <h1>Kindly login first</h1>
        <Button onClick={liginhere}> Login here </Button>
      </div>
      )
    }

  return (
    <div><h1>Orders</h1>
    {books.map(book => 
          <Cards key={book.id} id={book.id} link={`/book/orders/${book.id}`} {...book.data()}/>
        )}
    </div>
  )
}

export default Orders