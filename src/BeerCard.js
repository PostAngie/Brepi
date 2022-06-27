import React from 'react';

export default function BeerCard({ beer, flipped, onClick}) {

    return (
        <div className={`card ${flipped ? "is-flipped" : ""}`}>
            <div className="card__face card__face--front" onClick={onClick}>
                <img src={beer.image_url} alt={beer.name} />
                <div className="text-container">
                    <p>{beer.name}</p>
                </div>
            </div>
            <div className="card__face card__face--back">
                <p>{beer.description}</p>
            </div>
        </div>
    )
}