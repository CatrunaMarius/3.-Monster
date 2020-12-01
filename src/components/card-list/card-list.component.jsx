import React from 'react';

import {Card} from '../card/card.componet';

import './card-list.styles.css'

//se ocupa de crearea listei cu monstri
export const CardList = (props) => {
    console.log(props);
return <div className='card-list'>
    {props.monsters.map(monster =>(
          <Card key={monster.id} monster={monster}/>
        ))}
</div>
}