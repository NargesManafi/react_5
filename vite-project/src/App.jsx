import { Route, Routes } from "react-router-dom";

import { Contact } from "./components/Contact";
import { EditContact } from "./pages/EditContact";
import { Home } from "./pages/Home";
import { NewContact } from "./pages/NewContact";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
        <Route path="/contact/:id" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
