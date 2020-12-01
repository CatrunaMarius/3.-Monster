import React from 'react'


import './search-box.styles.css'

// Function Component este o componeta care prea propietati si returneaza html,
// daca nu ai nevoie de  a folosi intern state atunci folosesti function component 
// pentru ca este usor de citi, usor de testat si cate o data este mica si rezonabila de inteles

export const SearchBox = ({placeholder, heandleChange}) =>(
    <input 
    className = 'search'
    type='search' 
    placeholder={placeholder} 
    onChange={heandleChange} />
)