import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

const DetailPage = () => {
    const [data,setData] = useState(null)
    const [usrl,setURL] = useState(null);
    const params = useParams();
    const firebase = useFirebase()
    const [quantity,setQuentity] = useState(1)

    



    useEffect (()=>{
        firebase.getBookById(params.id).then(value=>setData(value.data()));
        
    },[])
    useEffect(()=>{
        if(data){
            const imgURL = data.imageURL;
            firebase.getImageUrl(imgURL).then(url=>setURL(url))
        }
    },[data])

    const placeOrderWithQuantity = async ()=>{
        console.log('inside place order')
        const data = await firebase.placeOrder(params.id,quantity)
        console.log('order placed ',data)

    }
    if(data === null){
        <h1>Loading</h1>
    }
    

  return (
    
    <>
        {
            data && <div className='container'>
            {console.log("data is ",data)}
            <h1 className='text-center mt-4'>{data.name}</h1>
            <img src={usrl} alt='img' width={'600px'} className='ml-5' />
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='m-2'>Enter Quntity</Form.Label>
          <Form.Control value={quantity} onChange={e=>setQuentity(e.target.value)} type="number" className='w-25 m-2' placeholder="Enter Quantity" />
          <Form.Text className="text-muted">
            please enter quantiity
          </Form.Text>
        </Form.Group>
        <Button variant='success' onClick={placeOrderWithQuantity}>Buy Now</Button>
           
            
          
        </div>
        }
    </>
   
  )
}

export default DetailPage
