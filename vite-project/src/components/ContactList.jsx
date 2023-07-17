import '../style.css';

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const CONTACTS_API = "http://localhost:8000/contacts";

export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [contactList, setContactList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(CONTACTS_API);
        setContactList(response.data);
        setDeleteStatus(Array(response.data.length).fill(false));
      } catch (error) {
        setError("Data could not be loaded. Please try later.");
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const contactDeleteHandler = async (id, index) => {
    try {
      setDeleteStatus((prevStatus) =>
        prevStatus.map((status, i) => (i === index ? true : status))
      );
      await axios.delete(`${CONTACTS_API}/${id}`);
      setContactList((prevList) =>
        prevList.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      setError("There was an error deleting the contact.");
      console.log("Error deleting contact:", error);
    }
  };

  const goToContactHandler = (id) => {
    navigate(`/contact/${id}`);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!isLoading && contactList.length === 0 && (
        <div>There are no contacts in the list!</div>
      )}
      {!isLoading &&
        contactList.map(({ id, name }, index) => (
          <div key={id} className="contact-list">
            <div className="contact-list__title">
              <h3 onClick={() => goToContactHandler(id)}>{name}</h3>
            </div>
            <div className="change-btns">
              <div>
                <Link to={`edit-contact/${id}`}>
                  <button className="btn">Edit</button>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => contactDeleteHandler(id, index)}
                  disabled={deleteStatus[index]}
                  className="btn-del"
                >
                  {deleteStatus[index] ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};