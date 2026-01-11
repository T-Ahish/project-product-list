import { useState } from "react";
import Header from "./components/header/Header";
import "./App.css";
import ProductList from "./components/productList/ProductList";

function App() {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
}

export default App;
