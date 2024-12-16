import React from "react";

function CartPage() {
  const cartItems = [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sepet</h2>
      {cartItems.length === 0 ? (
        <p>Sepet şu anda boş.</p>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
