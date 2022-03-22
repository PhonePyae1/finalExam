import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";

const API_URI = process.env.API_URL;

function App() {
  const itemRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();

  const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
    "data-items",
    JSON.stringify([])
  );

  const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));

  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [price, setPrice] = useState(0);



  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v._id);
    
    
    if (itemRef.current.value === "") {
    alert("Item name is empty");
    return;
    }

    if (Object.keys(dataItems).length > 0) {

      for (var key in dataItems) {
  
  
        if (itemRef.current.value === dataItems[key].code) {

          dataItems[key].remainingStock = (parseFloat(dataItems[key].remainingStock) + parseFloat(qtyRef.current.value)); 
          setDataItems([...dataItems])
          return;
        }
      }
    }
    
    var itemObj = {
      code: itemRef.current.value,
      name: itemRef.current.value,
      price: priceRef.current.value,
      remainingStock: qtyRef.current.value,
    };


  

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
    console.log("after", dataItems);
  };

  const deleteProduct=()=> {
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log(item);
    fetch(`${API_URI}/products`,{
      method: 'DELETE',
      body: JSON.stringify({
        _id: item._id
      })
    })
    .then(res => res.json)
    .then(data => {
      console.log('Delete',data)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const updateDataItems = (dataItems) => {
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
  }

  const clearDataItems = () => {
    setDataItems([]);
    setLocalDataItems(JSON.stringify([]));
  };

  const productChange = () => {
    console.log("productChange", itemRef.current.value);
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log("productChange", item);
    priceRef.current.value = item.price;
    console.log(priceRef.current.value);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
          <Col>
              <Form.Label>Item</Form.Label>
              <Form.Control type="text" ref={itemRef} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={priceRef}
                value={price}
                onChange={(e) => setPrice(priceRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          

          </div>
          {/* {JSON.stringify(dataItems)} */}
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
