import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeCard } from "../component/typecard";

export const Types = () => {
  const { categoryId } = useParams();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}/types`)
      .then(res => res.json())
      .then(data => setTypes(data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div className="cartas">
      {types.map(type => (
        <TypeCard key={type.id} type={type} />
      ))}
    </div>
  );
};
