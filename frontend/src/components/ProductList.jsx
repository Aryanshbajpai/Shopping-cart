import { useEffect, useState } from "react";
import API from "../api";

function ProductList({ refresh, setRefresh }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        `/products?search=${search}&sort=${sort}&page=${page}&limit=5`
      );

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh, search, sort, page]);

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted");
      setRefresh((prev) => !prev);
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${editProduct._id}`, editProduct);
      alert("Product Updated");
      setEditProduct(null);
      setRefresh((prev) => !prev);
    } catch (error) {
      alert("Update Failed");
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>

      <div className="filters">
        <input
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Latest</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>
      </div>

      {editProduct && (
        <form onSubmit={updateProduct} className="product-form">
          <h3>Update Product</h3>

          <input
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />

          <input
            type="number"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />

          <input
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
          />

          <input
            type="number"
            value={editProduct.stock}
            onChange={(e) =>
              setEditProduct({ ...editProduct, stock: e.target.value })
            }
          />

          <textarea
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                description: e.target.value
              })
            }
          />

          <button type="submit">Update Product</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
              <td>
                <button onClick={() => setEditProduct(item)}>Edit</button>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductList;