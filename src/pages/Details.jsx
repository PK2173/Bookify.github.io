import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firbase';
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";

const Details = () => {
    const params = useParams();
    const firbase = useFirebase();
    const [data, setdata] = useState('')
    const [url, seturl] = useState('');
    const [qtyinput, setqtyinput] = useState(false)
    const [askqty, setaskqty] = useState('')

    const placeOrder = async ()=>{
      if (askqty) {
        const result = await firbase.placeOrder(params.bookId,askqty)
        setaskqty('');
        setqtyinput(false);
      }else{
        alert('Kindly enter Quntity')
      }
    }

    useEffect(() => {
      firbase.getBookById(params.bookId).then(value => setdata(value.data()))
    }, [])
    
    useEffect(() => {
        if (data) {
            const imageUrl = data.imageURL;
            firbase.getImageURL(imageUrl).then(url => seturl(url))
        }
    }, [data,firbase])
    

    if(!data && url){
        return <h1>Loding...!!</h1>
    }
    
  return (
    <div className='container mt-5 mb-5'>
      {(qtyinput) ? <>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Quntity</Form.Label>
          <Form.Control type="Number" required onChange={e => setaskqty(e.target.value)} value={askqty} placeholder="Enter Quntity" />
        </Form.Group>
        <Button variant='success' onClick={(e)=>setqtyinput(false)}>Back</Button>
        <br />
        <Button variant='success' onClick={placeOrder} setaskqty>Place Order</Button>
        </> :
      <>
        <h1>{data.Name}</h1>
        <img src={url} alt={url} width='50%' style={{borderRadius:'10px'}}/>
        <h4>Price : Rs. {data.price}</h4>
        <h1>Owner Details</h1>
        <h4>Owner Name : {data.displayName}</h4>
        <h4>Owner Email : {data.userEmail}</h4>
        <h4>Owner isbnNumber : {data.isbnNumber}</h4>
        <Button variant='success' onClick={(e)=>setqtyinput(true)}>Buy Now</Button>
      </>
      }
    </div>
  )
}

export default Details