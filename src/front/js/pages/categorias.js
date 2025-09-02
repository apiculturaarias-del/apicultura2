import React, { useEffect, useState } from "react";
import { Card } from "../component/card";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/categories") // <- CORRECTO
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
			<div className="cartas">
      {categories.map(cat => (
        <Card key={cat.id} category={cat} />
      ))}
    </div>
  );
};