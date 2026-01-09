import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    cartItems,
    removeFromCart,
    navigate,
  } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          window.scrollTo(0, 0);
        }}
        className="border border-gray-300 rounded-md bg-white w-44 md:w-70 cursor-pointer hover:shadow-md transition flex flex-col"
      >
        {/* Product Image */}
        <div className="flex justify-center items-center p-4">
          <img
            src={product.image[0]}
            alt={product.name}
            className="h-40 md:h-44 object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Product Info */}
        <div className="px-4 pb-4 flex flex-col flex-1">
          {/* Category */}
          <p className="text-gray-500 text-sm mb-1">{product.category}</p>

          {/* Name */}
          <p className="text-gray-800 font-medium text-base md:text-lg mb-2 truncate">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="w-4 md:w-4.5 h-auto"
                  alt="star"
                />
              ))}
            <span className="text-gray-500 text-xs">(4)</span>
          </div>

          {/* Price & Cart */}
          <div className="flex items-center justify-between mt-auto">
            <p className="text-primary font-medium text-base md:text-xl">
              {currency}
              {product.offerPrice}{" "}
              <span className="line-through text-gray-400 text-sm md:text-base ml-1">
                {currency}
                {product.price}
              </span>
            </p>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center"
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 px-3 md:px-4 h-8 md:h-9 rounded text-sm md:text-base"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" className="w-4 md:w-5" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/25 rounded h-8 md:h-9 px-2 md:px-3 select-none">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-base md:text-lg px-1"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="text-base md:text-lg px-1"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
