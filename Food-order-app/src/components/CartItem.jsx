import React from "react";
import { currencyFormatter } from "../util/formatting";
export const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <li className="cart-item">
      <p>
        {item.name}-{item.quantity}*{currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>Qty</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};
