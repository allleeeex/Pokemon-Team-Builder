import './PokemonCard.css'
import { Link } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    return (
        <Link className="card" to={`pokemon/${pokemon.name}`}>
            <div>{pokemon.name}</div>
        </Link>
    )
}  

export default PokemonCard