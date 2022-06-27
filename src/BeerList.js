import React from "react";
import { useState} from "react";
import BeerCard from "./BeerCard";


export default function BeerList ({data}){
const [currentFlippedId, setCurrentFlippedId] = useState(0);


return (
 <div className="card-container">
    {data.map(item => (
        <BeerCard beer={item} key={item.id} flipped={item.id === currentFlippedId} onClick={() => setCurrentFlippedId(item.id)}/>
      ))}
 </div>
)
}