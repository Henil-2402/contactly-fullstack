import React, { useState } from "react";
import { isEmail, isPhone } from "../utils/validators";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: ""
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name) e.name = "Name is required";
    if (!isEmail(email)) e.email = "Enter a valid email address";
    if (!isPhone(phone)) e.phone = "Enter a valid phone number (10–15 digits)";
    if (!message) e.message = "Message is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSent(false);

    if (!validate()) return;

    setLoading(true);

    const res = await fetch("http://localhost:4000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim()
      })
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        honeypot: ""
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={submit} className="form">

      {sent && (
        <p className="success" style={{ color: "green", marginBottom: "10px" }}>
          🎉 Your message has been sent successfully! We’ll get back to you soon.
        </p>
      )}

      {/* Honeypot hidden field */}
      <input
        name="honeypot"
        style={{ display: "none" }}
        onChange={handleChange}
        value={form.honeypot}
      />

      <label>Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className={errors.name ? "input-error" : ""}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className={errors.email ? "input-error" : ""}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label>Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className={errors.phone ? "input-error" : ""}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label>Message</label>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        className={errors.message ? "input-error" : ""}
      ></textarea>
      {errors.message && <p className="error">{errors.message}</p>}

      <button disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
