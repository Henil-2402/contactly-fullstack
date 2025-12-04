import React from "react";
import ContactForm from "./components/ContactForm";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Contactly</h1>
      <p>Simple Contact Form using React + Node</p>

      <ContactForm />
    </div>
  );
};

export default App;
