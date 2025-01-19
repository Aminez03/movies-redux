import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p style={styles.text}>
              © 2024 MyMovies. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div>
              <a href="#" style={styles.link}>
                Politique de confidentialité
              </a>
              {' | '}
              <a href="#" style={styles.link}>
                Conditions d'utilisation
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor:"#212529",
    color: '#fff',
    padding: '20px 0',
    position: 'relative',
    bottom: 0,
    width: '100%',
    marginTop: 'auto', // Assure que le footer reste en bas
  },
  text: {
    margin: 0,
    fontSize: '14px',
  },
  link: {
    color: '#f8f9fa',
    textDecoration: 'none',
    margin: '0 5px',
  },
};

export default Footer;
