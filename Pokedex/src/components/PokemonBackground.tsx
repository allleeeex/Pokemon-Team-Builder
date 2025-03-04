import pokedex from '../assets/pokedex.webp'
import './PokemonBackground.css'

function PokemonBackground() {
    return (
        <img className="layout" src={pokedex}/>
    )
}

export default PokemonBackground