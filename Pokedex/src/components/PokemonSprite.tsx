import React from 'react';
import './PokemonFrontSprite.css'

interface PokemonSpriteProps {
    frontSprite: string;
}

const PokemonSprite: React.FC<PokemonSpriteProps> = ({ frontSprite }) => {
    return (
        <img src={frontSprite} className='front-sprite'></img>
    );
};

export default PokemonSprite