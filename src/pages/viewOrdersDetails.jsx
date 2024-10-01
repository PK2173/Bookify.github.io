import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firbase'

const ViewOrdersDetails = () => {
    const param = useParams()
    const firbase = useFirebase()
    const [orders, setorders] = useState([])

    useEffect(() => {
      firbase.getOrders(param.bookId).then(orders => setorders(orders.docs)
      )
    }, [])
    
    
  return (
    <div className='container'>
        <h1>Orders</h1>
        {orders.map(order=>{
            const data = order.data()
            return(<div key={order.id} className='mt-5' style={{border: '1px solid black'}}>
                <h5>Ordered By : {data.displayName}</h5>
                <h6>Quentity : {data.qty}</h6>
                <h6>Customer Email : {data.userEmail}</h6>
            </div>)
        })}
    </div>
  )
}

export default ViewOrdersDetails