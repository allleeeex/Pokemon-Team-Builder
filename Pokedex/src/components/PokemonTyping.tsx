import './PokemonTyping.css'
import normalPNG from '../assets/normal.png'
import fightingPNG from '../assets/fighting.png'
import flyingPNG from '../assets/flying.png'
import poisonPNG from '../assets/poison.png'
import groundPNG from '../assets/ground.png'
import rockPNG from '../assets/rock.png'
import bugPNG from '../assets/bug.png'
import ghostPNG from '../assets/ghost.png'
import steelPNG from '../assets/steel.png'
import firePNG from '../assets/fire.png'
import waterPNG from '../assets/water.png'
import grassPNG from '../assets/grass.png'
import electricPNG from '../assets/electric.png'
import psychicPNG from '../assets/psychic.png'
import icePNG from '../assets/ice.png'
import dragonPNG from '../assets/dragon.png'
import darkPNG from '../assets/dark.png'
import fairyPNG from '../assets/fairy.png'

interface TypingsArray {
    slot: number;
    type: TypeType;
}

interface TypeType {
    name: string;
    url: string;
}

interface TypeImageUrlMap  {
    [key: string]: string;
}

const TypeImageURLS: TypeImageUrlMap = {
    normal: normalPNG,
    fighting: fightingPNG,
    flying: flyingPNG,
    poison:  poisonPNG,
    ground: groundPNG,
    rock: rockPNG,
    bug: bugPNG,
    ghost: ghostPNG,
    steel: steelPNG,
    fire: firePNG,
    water: waterPNG,
    grass: grassPNG,
    electric: electricPNG,
    psychic: psychicPNG,
    ice: icePNG,
    dragon: dragonPNG,
    dark: darkPNG,
    fairy: fairyPNG
}

function PokemonTyping({ types } : { types: TypingsArray[]}) {
    return  (   
        <div className="typing-box">
            {types.map(typer => (
                <img src={TypeImageURLS[typer.type.name]} className="typingImg"/>
            ))}
        </div>
    )
}

export default PokemonTyping