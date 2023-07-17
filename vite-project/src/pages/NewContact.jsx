import '../style.css';

import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

const CONTACTS_API = "http://localhost:8000/contacts";

export const NewContact = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ error: "", success: "" });
  
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    const addContactHandler = async () => {
        try {
            setIsLoading(true);
            await axios.post(CONTACTS_API, { name, number });
            setIsLoading(false);
            console.log("Contact added successfully!");
            setStatus({ error: "", success: "Contact added successfully!" });
        } catch (error) {
            setIsLoading(false);
            setStatus({
                error: "An error occurred. Please try again later.",
                success: "",
            });
            console.log("Error adding contact:", error);
        }
    };
    
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!/^09\d{9}$/.test(number)) {
            setStatus({
                error: "Phone number must start with 09 and be 11 digits long.",
                success: "",
            });
            setTimeout(() => {
                setStatus({ error: "" });
            }, 5000);
        } else if (name.trim() === "") {
            setStatus({
                error: "Name cannot be empty.",
                success: "",
            });
            setTimeout(() => {
                setStatus({ error: "" });
            }, 5000);
        } else {
            addContactHandler();
            setName("");
            setNumber("");
            setTimeout(() => {
                setStatus({ success: "", error: "" });
            }, 5000);
            inputRef.current.focus();
        }
    };
    
    return (
        <div className="container">
            <div className="title">
                <h1>Add New Contact</h1>
                <Link to="/">
                    <button className="btn">Back to Home Page</button>
                </Link>
            </div>
            <form onSubmit={formSubmitHandler} className="addform">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    ref={inputRef}
                />
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="input"
                />
                <button className="btn" type="submit">
                    {isLoading ? "Adding..." : "Add"}
                </button>
            </form>
            {status.error && <div className="error">{status.error}</div>}
            {status.success && <div className="success">{status.success}</div>}
        </div>
    );
  };