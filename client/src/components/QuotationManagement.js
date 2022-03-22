import React, { useEffect, useState, useRef } from "react";
import {
  Nav,
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Quotation from "./Quotation";


export default function QuotationManagement() {
  const API_URL = process.env.API_URL;

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [productRows, setProductRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const [product, setProduct] = useState({
    remainingStock: 0,
    name: "",
    price: 0,
  });

  // Input references
  const refCode = useRef();
  const refName = useRef();
  const refPrice = useRef();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
            let sum = 0;
            let amount = e.remainingStock * e.price;
            sum += amount;
          return (
            <tr key={i}>
              <td>
                &nbsp;
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                    console.log(e)
                  }}
                />
              </td>
              <td>{e.remainingStock}</td>
              <td>{e.name}</td>
              <td>{e.price}</td>
            </tr>
          );
        });
        setTotal(sum);
        setProducts(data);
        setProductRows(rows);
        console.log(products)
      });
  }, []);

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleDelete = (product) => {
    console.log(product);
    if (window.confirm(`Are you sure to delete [${product.name}]?`)) {
      fetch(`${API_URL}/products`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === product._id) {
              products.splice(i,1);
              break;
            }
          }

          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.remainingStock}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
              </tr>
            );
          });
  
          setProducts(products);
          setProductRows(rows);     
          handleClose();
        });
    }
  };

  const handleShow = () => setShow(true);

  const handleUpdate = (product) => {
    console.log("Update Product", product);
    console.log(refCode);
    refCode.current = product.code;

    setShow(true);
    setProduct(product);
  };

  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleFormAction = () => {
    if (modeAdd) {
      // Add new product
      const newProduct = {
        code: refCode.current.value,
        name: refName.current.value,
        price: refPrice.current.value,
      };
      console.log(newProduct);

      fetch(`${API_URL}/products`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully added the product
          console.log("POST Result", json);
          products.push(json);
          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.code}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
              </tr>
            );
          });

          setProducts(products);
          setProductRows(rows);
          handleClose();
        });
    } else {
      // Update product
      const updatedProduct = {
        _id: product._id,
        code: refCode.current.value,
        name: refName.current.value,
        price: refPrice.current.value,
      };
      console.log(updatedProduct);

      fetch(`${API_URL}/products`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(updatedProduct), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully updated the product
          console.log("PUT Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === updatedProduct._id) {
              console.log(products[i], updatedProduct);
              products[i] = updatedProduct;
              break;
            }
          }

          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  
            
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.qty}</td>
                <td>{e.code}</td>
                <td>{e.price}</td>
              </tr>
            );
          });

          setProducts(products);
          console.log(products)
          console.log(rows)
          setProductRows(rows);
          handleClose();
        });
    }
  };

  return (
    <>
      <Container>
        <h1>Quotation Management</h1>
        {/* API_URL: {API_URL} */}
        <Link to="/react-quotation" className="btn btn-primary">Add</Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textCenter}>Qty</th>
              <th className={style.textCenter}>Item</th>
              <th className={style.textCenter}>Price</th>

            </tr>
          </thead>
          <tbody>{productRows}</tbody>
          <tfoot>
          <tr>
            <td colSpan={3} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
        </Table>
      </Container>
      
      <Routes>
        <Route path="/react-quotation" element={<Quotation />} />
      </Routes>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add New Product" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Code</Col>
              <Col>
                <input type="text" ref={refCode} defaultValue={product.code} />
              </Col>
            </Row>
            <Row>
              <Col>Name</Col>
              <Col>
                <input type="text" ref={refName} defaultValue={product.name} />
              </Col>
            </Row>
            <Row>
              <Col>Price</Col>
              <Col>
                <input
                  type="number"
                  ref={refPrice}
                  defaultValue={product.price}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {modeAdd ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
