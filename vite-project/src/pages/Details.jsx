import '../style.css';

import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
  
    useEffect(() => {
      axios.get(`http://localhost:8000/contacts/${id}`)
        .then(res => {
          setContact(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        <h1>Contact Detail</h1>
        <p>Name: {contact.name}</p>
        <p>Phone: {contact.phone}</p>
      </>
    );
};

export default Detail;
