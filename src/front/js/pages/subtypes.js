import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubtypeCard } from "../component/SubtypeCard";

export const Subtypes = () => {
  const { typeId } = useParams();
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api/types/${typeId}/subtypes`)
      .then(res => res.json())
      .then(data => setSubtypes(data))
      .catch(err => console.error(err));
  }, [typeId]);

  return (
    <div className="cartas">
      {subtypes.map(subtype => (
        <SubtypeCard key={subtype.id} subtype={subtype} />
      ))}
    </div>
  );
};
