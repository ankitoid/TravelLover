import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ email: '', firstName: '', lastName: '', company: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error sending email');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-orange-500 text-center">Contact Us</h3>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" className="w-full p-2 border rounded" onChange={handleChange} />
        <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
