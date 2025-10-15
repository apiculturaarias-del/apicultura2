import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemCard } from "../component/itemcard";

export const Articulos = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="cartas">
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
