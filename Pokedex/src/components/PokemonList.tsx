import './PokemonList.css'
import PokemonCard from './PokemonCard'

function PokemonList({ pokemonData }) {
    return (
        <div className="list">
            {pokemonData.map((pokemon, index)=> (
                <PokemonCard key={`${pokemon.name}-${index}`} pokemon={pokemon} />
            ))}
        </div>
    )
}  

export default PokemonList