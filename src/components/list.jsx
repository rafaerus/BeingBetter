import React from "react";

const List = ({ title = "Produk yang ditambahkan :", products = [] }) => {
  return (
    <>
      {/* Judul di luar background putih */}
      <h2 className="product-list-title">{title}</h2>

      {/* Container untuk semua card */}
      <div className="product-cards-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="product-card">
              <span className="product-text">{product}</span>
            </div>
          ))
        ) : (
          <div className="product-card">
            <span className="product-text">
              Belum ada produk yang ditambahkan
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
