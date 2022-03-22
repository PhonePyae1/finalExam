import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { useLocalStorage } from "react-use";
import Quotation from "./components/Quotation";
import ProductManagement from './components/ProductManagement'
import QuotationManagement from './components/QuotationManagement'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">VMS Company</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/react-quotation">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="/react-quotation/quotation-management">Quotation</Nav.Link>
            <Nav.Link href="/react-quotation/product-management">
              Product
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/react-quotation/product-management"
          element={<ProductManagement />}
        />
        <Route
          path="/react-quotation/quotation-management"
          element={<QuotationManagement />}
        />

        <Route path="/react-quotation" element={<Quotation />} />
      </Routes>
    </Router>
  );
}

export default App;
