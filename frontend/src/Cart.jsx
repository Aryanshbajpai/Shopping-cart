import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  const addItem = () => {
    const item = {
      id: Date.now(),
      name: "Laptop",
      price: 50000,
      quantity: 1
    };

    setCart([...cart, item]);
  };

  const updateItem = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      <button onClick={addItem}>
        Add Item
      </button>

      {cart.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => updateItem(item.id)}>
            Update
          </button>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;