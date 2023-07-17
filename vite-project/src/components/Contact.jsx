import '../style.css'

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const CONTACTS_API = "http://localhost:8000/contacts";

export const Contact = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [contactDetail, setContactDetail] = useState({});

  useEffect(() => {
    const fetchContactDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${CONTACTS_API}/${id}`);
        setIsLoading(false);
        setContactDetail(response.data);
      } catch (error) {
        setIsLoading(false);
        setError("Data could not be loaded. Please try later.");
      }
    };

    fetchContactDetail();
  }, [id]);

  const { name, number } = contactDetail;

  return (
    <div className="container">
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <h1 className="title">Contact {id}</h1>
      <h2>Name: {name}</h2>
      <h2>Number: {number}</h2>
      <Link to="/">
        <button className="btn">Back</button>
      </Link>
    </div>
  );
};