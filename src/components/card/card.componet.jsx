import React from 'react'

import './card.styles.css'


export const Card = props =>(
    <div className="card-container">
        {/* afiseaza imaginile cu monstri */}
        <img alt="monster" src={`https://robohash.org/${props.monster.id}?set=set2&size=180x180`} />
        {/* afiseaza numele monstrului */}
        <h2 >{props.monster.name}</h2>
        <p>{props.monster.email}</p>
    </div>
)