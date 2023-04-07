import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


const BookCrad = ({item,id},props) => {
  const firebase = useFirebase();
  const [imageUrl,setUrl] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageUrl(item.imageURL).then(url=>setUrl(url))

  },[imageUrl,firebase,item])
  
  return (
    <div>
      <Card style={{ width: "18rem" }} className="m-3">
        <Card.Img variant="top" height={'300px'} src={imageUrl} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text className="text-dark h6 mt-4">
            PRICE : {item.price}
          </Card.Text>
          <Button onClick={()=>navigate(props.link)} variant="primary">Detail</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookCrad;
