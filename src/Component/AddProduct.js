import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    sizes: "",
    price: "",
    description: "",
    img: "",
    color: "",
    brand: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/addshirt", formData, {
        headers: { "Content-Type": "application/json" }
      });
      
      if (response.status === 200) {
        alert("Shop item added successfully!");
        setFormData({ title: "", sizes: "", price: "", description: "", img: "", color: "", brand: "" });
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the item.");
    }
  };

  return (
    <Container className="mt-4">
      <AdminNavbar/>
      <h2 className="text-center mb-4">Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="sizes" placeholder="Sizes" value={formData.sizes} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Add Product</Button>
      </Form>
     
    </Container>
  );
}
