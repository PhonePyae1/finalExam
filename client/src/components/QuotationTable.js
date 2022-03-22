import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module.css";
import { FaTrashAlt } from "react-icons/fa";

function QuotationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataItems, setDataItems] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.remainingStock * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code)} />
          </td>
          <td className={style.textCenter}>{v.remainingStock}</td>
          <td>{v.name}</td>
          <td className={style.textCenter}>{formatNumber(v.price)}</td>
          <td className={style.textRight}>{formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const saveTable = () => {
  
    for (var key in data) {
      console.log(JSON.stringify(data[key]))
      const API_URL = process.env.API_URL;
      fetch(`${API_URL}/products`, {
        method: "POST",
        mode: "cors",
       
        headers: {
          "Content-Type": "application/json",
          
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data[key]), 
      })
    }
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>
      <Button onClick={saveTable} variant="outline-dark">
        Save
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default QuotationTable;
