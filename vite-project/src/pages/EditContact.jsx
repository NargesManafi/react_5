import '../style.css';

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import axios from "axios";

const CONTACTS_API = "http://localhost:8000/contacts";

export const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigateTo = useNavigate();
  const [status, setStatus] = useState({ error: "", success: "" });
  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
    const fetchData = async () => {
      try {
        setIsInputLoading(true);
        const response = await axios.get(`${CONTACTS_API}/${id}`);
        setIsInputLoading(false);

        const { name, phoneNumber } = response.data;
        setName(name);
        setPhoneNumber(phoneNumber);
      } catch (error) {
        setIsInputLoading(false);

        setStatus({
          error: "Data could not be loaded. Please try again later.",
          success: "",
        });
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    if (!/^09\d{9}$/.test(phoneNumber)) {
      setStatus({
        error: "Phone number must start with 09",
        success: "",
      });
      setTimeout(() => {
        setStatus({ error: "" });
      }, 5000);
      return;
    } else if (name.trim() === "") {
      setStatus({
        error: "Name field cannot be empty.",
        success: "",
      });
      setTimeout(() => {
        setStatus({ error: "" });
      }, 5000);
      return;
    }

    const requestBody = { name, phoneNumber };

    try {
      setIsLoading(true);
      await axios.put(`${CONTACTS_API}/${id}`, requestBody);
      setIsLoading(false);

      setIsRedirecting(true);
      navigateTo("/");
      setStatus({
        error: "",
        success: "Contact edited successfully.",
      });
    } catch (error) {
      setIsLoading(false);
      setIsRedirecting(false);

      setStatus({
        error: "An error occurred. Please try again later.",
        success: "",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Edit Contact</h1>
        <Link to="/">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
      <form onSubmit={handleEditFormSubmit} className="edit-contact-form">
        <input
          type="text"
          placeholder={isInputLoading ? "Loading..." : "Enter full name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="edit-contact-form__input"
          ref={nameInputRef}
        />
        <input
          type="tel"
          pattern="[0-9]{11}"
          placeholder={isInputLoading ? "Loading..." : "Enter phone number (09xxxxxxxxx)"}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          className="edit-contact-form__input"
        />
        <button className="edit-contact-form__btn" type="submit">
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
      {isRedirecting && <div>Please wait...</div>}
      {status.error && <p className="edit-contact-form__error">{status.error}</p>}
      {status.success && <p className="edit-contact-form__success">{status.success}</p>}
    </div>
  );
};