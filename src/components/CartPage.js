import React from "react";

function CartPage({ cartItems, removeFromCart, clearCart }) {
  const handleOrder = () => {
    clearCart(); 
    alert("Siparişiniz başarıyla alındı!");
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <h2>Sepet</h2>
      {cartItems.length === 0 ? (
        <p>Sepet şu anda boş.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <div>
                  <h5>{item.name}</h5>
                  <p>Fiyat: ${item.price || 10}</p>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Kaldır
              </button>
            </div>
          ))}
          <h4>
            Toplam: $
            {cartItems.reduce((total, item) => total + (item.price || 10), 0)}
          </h4>
          <button
            onClick={handleOrder}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Siparişi Ver
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
