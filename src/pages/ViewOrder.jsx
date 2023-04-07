import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const ViewOrder = () => {
    const [orders,setOrders] = useState([]);
    const params = useParams()
    const firebase = useFirebase();

    useEffect(()=>{
        firebase.getOrders(params.id).then(orders=>setOrders(orders.docs))
    })

  return (
    <div>
      <h1>Orders</h1>
      <div>
       {
         orders.map(order=>(
            <div>
                Orderd by : order.displayName
            </div>
            ))
       }
      </div>
    </div>
  )
}

export default ViewOrder
