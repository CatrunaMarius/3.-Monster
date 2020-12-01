import React, {Component}  from 'react';

import  { CardList} from './components/card-list/card-list.component'
import {SearchBox} from './components/search-box/search-box.component'

import './App.css';

// ============================= TEORIE =================================
// React va copia DOM actual in javascri si se va numi virtual Dom
// De fiecare data cand actualizam data care va fi  render in componete
//cand se  produce o actiune la o anumita componeta
// react va copia din nou acel virtual Dom si 
// va aplica o modificare doar la acel elemet 
// si dupa acea va compara acest virtual Dom copi cu vechiul DOM (DOM actual)
// si dupaia acea va aplica acea modificare la Actual DOM

// trebuie sa pui acel state cat mai sus astfel incat si celelalte componente sa aiba acces, 
// daca componetele nu au nevoie de acel state atunci putem sa il punem cat mai jos,   
// pentru ca data(state) functioneaza intr-un singur sens, de sus in josul DOM sau 
// State(data) -> views (react foloseste acele date pentru a crea views) -> actions 
// (daca utilizatorul face ceva de la puctul de view va activa aceste actions) ->state 
// (care va modifica acest state ) 


// Asynchronus setState 
// Ex de setState Asynchronus
heandelClick = () => {
  this.setState({meaningOfLife:this.state.meaningOfLife +1})
  console.log(this.state.meaningOfLife);
}
// Asynchronus setState = actiunea nu se produce idemediat cea ce reat nu promite ca va functiona mereu 
// pentru a rezolva aceasta problema putem da un nou parametru si anume un callback
heandelClick = () => {
  this.setState({meaningOfLife:this.state.meaningOfLife +1},
    ()=>console.log(this.state.meaningOfLife))
  }
// dar aceasta este o practica rea pentru ca  setState batches functioneaza intr-un singur update asa cum am mentinat
//  daca am avea multiple setState nu va garanta cand vom incrementa meaningoflife va functiona
// deoarece nu este garantat exista o regula in react pe care trebuie sa o urmam:
// daca in setState vei folosi vrodata acest  'this.state.meaningOfLife +1' atunci va trebui sa folisim asa:
 
heandelClick = () => {
  this.setState((prevState, prevProps)=>{
    return{meaningOfLife:prevState.meaningOfLife +1}},// cea ce va inlocui this.state cu prevState
    ()=>console.log(this.state.meaningOfLife))
  }

// state update  sunt sincronizate si trebuie sa fi atent.
// regula este aceasta, vrei sa manipulezi sau sa foloset acest state cunva dupa update
// adunci vei aduga un alt parametru care va fi o functie care o vei folosi pentru a updated state,
// poate in update-ul si in state update ai folosit stat ca parte a calculari ori ca props parte a calculatie 
// atunci trebuie sa treci aceasta functie :
// (prevState, prevProps)=>{return {meaningOfLife: prevState.meaningOfLife +1}}
//  pentru a updata state

// ================================================================================================================

class App extends Component {

  constructor(){
    super();
    this.state={
      monsters:[],
      searchField: ''
    }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(user => this.setState({ monsters: user }));
  }

  // ca metoda heandleSearchChange trebuie sa  bind this pentru a recunoaste functionalitatea,
  // pentru ca this se va referi la alt ceva si nu la state
  // dar cu ajutorul ES6 si functiei sageata '=>' atunci this va fi bind 
  // si cu acest lucru nu mai e nevoie de a defini metoda in interiorul construnctorului 
  // pentru al bind de fiecare data cand crem o noua metoda/functie.
  // Ex. de cu ar trebui sa defini metoda pentru a nu mai folosi functionalitatea ES6 si '=>'
  // this.heandleSearchChange = this.heandleSearchChange.bind(this) 
  
  heandleSearchChange = e =>{
    this.setState({searchField: e.target.value})
  };

 render(){

  // Destructurare = si obiectul pe care vrem sa il destructuram
  const { monsters, searchField } = this.state;

  // creare o functie/metoda de filtrare a monstrilor
  const filteredMonsters = monsters.filter(monsters=>
    monsters.name.toLowerCase().includes(searchField.toLowerCase()))
  
  return (
    <div className="App">

      <h1>Monsters Rolodex</h1>
      {/* creaza o bara de cautare, functie de filtrare, filtreaza monstri in functie  de litera/cuvantul
       pe care o introducem si verifica cada litera/cuvantul il contine in html    */}
     
       <SearchBox 
        placeholder='search monsters'
        heandleChange= {this.heandleSearchChange}
       />

      {/* reader/afiseaza monstri  */}
      <CardList monsters={filteredMonsters} />
        
      
    </div>
  );
 } 
 
}

export default App;
