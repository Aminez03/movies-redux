import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './Contact.css';

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      const response = await fetch('https://formspree.io/f/mayggzkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShow(true);
        setError(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="title">
        <h1>Contactez-nous</h1>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <input
            type="text"
            className="input"
            placeholder="Votre nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="input"
            placeholder="Sujet"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="msg">
          <textarea
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn">
            Envoyer
          </button>
        </div>
      </form>
      {show && (
        <div className="alert">
          <Alert show={show} variant="success">
            <Alert.Heading>Merci !</Alert.Heading>
            <p>Votre message a été envoyé avec succès.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}
      {error && (
        <div className="alert">
          <Alert show={error} variant="danger">
            <Alert.Heading>Erreur !</Alert.Heading>
            <p>Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setError(false)} variant="outline-danger">
                Fermer
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
