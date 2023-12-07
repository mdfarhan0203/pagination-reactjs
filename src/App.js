import React, { useState, useEffect } from "react";

export default function App() {
  const [product, setProduct] = useState(null);

  const [showProduct, setShowProduct] = useState(10);
  const [skipNo, setSkipNo] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  async function getProduct() {
    let response = await fetch(
      `https://dummyjson.com/products?limit=${showProduct}&skip=${skipNo}`
    );
    let result = await response.json();
    console.log("result", result);
    setProduct(result);
  }

  useEffect(() => {
    getProduct();
  }, [skipNo]);


  const pagingHandler = (e) => {
    console.log("pageeee",pageNumber);
    let clickedId = e.target.id;
    if(pageNumber > 0 || clickedId == "next"){
      if (clickedId == "next") {
        setSkipNo(skipNo + 10);
        setPageNumber(pageNumber + 1);
      }
      if (clickedId == "pre") {
        setSkipNo(skipNo - 10);
        setPageNumber(pageNumber - 1);
      }
    }

  };

  return (
    <div className="app">
      <h1 className="heading">Paging Logic</h1>
      <div className="container">
        {product &&
          product.products.map((item, index) => {
            return (
              <div key={item.id}>
                <img className="image" src={item.images[0]}></img>
                <p className="title">{item.title}</p>
                <p className="price"> $ {item.price}</p>
              </div>
            );
          })}
      </div>
      <div className="paging-button">
        <button className="btn pre" onClick={pagingHandler} id="pre">
          pre
        </button>
        <p className="page_number">{pageNumber}</p>
        <button className="btn next" onClick={pagingHandler} id="next">
          next
        </button>
      </div>
    </div>
  );
}
