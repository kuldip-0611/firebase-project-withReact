import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCrad from '../components/BookCrad'

const Order = () => {
  const [data,setData]= useState([])
  const firebase = useFirebase();
 
   useEffect(()=>{
    if(firebase.isLoggedIn) {
      firebase.fetchUsersOrder(firebase.user.uid).then(books=>setData(books.docs))
    }
   },[firebase])
    
  return (
    <>
    {console.log(data,'this is order data')}
      {
        data.map(book=>(
          <BookCrad  link = {`/book/orders/${book.id}`} key={book.id} id={book.id} item={book} />
        ))
      }
    </>
  );
};

export default Order;
