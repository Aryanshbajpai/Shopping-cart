import { useState } from "react";
import API from "../api";

function ProductForm({ setRefresh }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", product);

      alert("Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: ""
      });

      setRefresh((prev) => !prev);
    } catch (error) {
      alert("Product Add Failed");
    }
  };

  return (
    <form onSubmit={addProduct} className="product-form">
      <h3>Add Product</h3>

      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;