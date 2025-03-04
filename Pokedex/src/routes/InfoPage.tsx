import { useEffect, useState } from 'react';
import './InfoPage.css'
import { useParams } from 'react-router-dom';
import PokemonBackground from '../components/PokemonBackground'

import PokemonName from '../components/PokemonName';
import PokemonTyping from '../components/PokemonTyping';
import PokemonStats from '../components/PokemonStats';
import PokemonAbilites from '../components/PokemonAbilities';

// For Middle Container
import PokemonFrontSprite from '../components/PokemonSprite';

// For Right Container
import PokemonMoves from '../components/PokemonMoves';

function InfoPage() {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState<any>(null);
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => {
                setPokemon(data);
            })
    }, []);

    if (!pokemon) {
        return <div>loading...</div>
    }

    return (
        <>
            <PokemonBackground/>
            <div className="layout">
                <div className="left-container">
                    <PokemonName name={pokemon.name}></PokemonName>
                    <PokemonTyping types={pokemon.types}></PokemonTyping>
                    <PokemonStats stats={pokemon.stats}></PokemonStats>
                    <PokemonAbilites abilities={pokemon.abilities}></PokemonAbilites>
                </div>
                <div className="middle-container">
                    <PokemonFrontSprite frontSprite={pokemon.sprites.front_default}/>
                </div>
                <div className="right-container">
                    <PokemonMoves moves={pokemon.moves}></PokemonMoves>
                </div>
            </div>
        </>
    )
}

export default InfoPage