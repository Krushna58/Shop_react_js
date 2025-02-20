import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

export default function DeleteProduct() {
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.delete("http://localhost:8080/deletebydesc", {
        params: { desc },
      });

      setMessage(response.data);
      setDesc("");
    } catch (error) {
      setError("Failed to delete the product. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-4">
       <AdminNavbar/>
      <h2 className="text-center mb-4">Delete Product</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            placeholder="Enter product description" 
            value={desc} 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="danger" type="submit" className="w-100">Delete Product</Button>
      </Form>
    </Container>
  );
}
