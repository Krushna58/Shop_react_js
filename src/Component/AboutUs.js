import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar1 from "./Navbar1";

const AboutUs = () => {
  return (
    <div>
      <Navbar1/>
       <Container className="mt-5">
      <Card className="shadow-lg p-4 border-0">
        <Card.Body>
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-muted text-center">
            Welcome to <strong>The T-Shirt Studio</strong>, your go-to destination for high-quality t-shirts. We specialize in creating unique and stylish designs tailored to your needs.
          </p>
          <Row className="mt-4">
            <Col md={6}>
              <h4>Contact Information</h4>
              <p>
                <strong>Email:</strong> <a href="mailto:bhosalekrushna34@gmail.com">bhosalekrushna34@gmail.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+919764315302">9764315302</a>
              </p>
            </Col>
            <Col md={6}>
              <h4>Our Location</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1085.5236579473176!2d73.78855019216469!3d18.596638026455004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b91927d2d4cb%3A0x5ea0053bda8af905!2sRainbow%20Plaza%2C%203rd%2C%20Kunal%20Icon%20Rd%2C%20Sunshine%20Villas%2C%20Dwarkadheesh%20Gardens%2C%20Pimple%20Saudagar%2C%20Pune%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411027!5e0!3m2!1sen!2sin!4v1739696592851!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>

    </div>
   
  );
};

export default AboutUs;
