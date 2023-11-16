import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import CartContext from "../store/CartContext";
export const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);
  function addItemHandler(meal) {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={meal.image} alt={meal.name} />
        <div>
          <h2>{meal.name}</h2>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItemHandler(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};
