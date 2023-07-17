import '../style.css';

import { ContactList } from "../components/ContactList";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container">
      <div className="title">
        <h1>Contact List</h1>
        <Link to="/new-contact">
          <button className="btn">Add</button>
        </Link>
      </div>
      <div className="contactList">
        <ContactList />
      </div>
    </div>
  );
};
