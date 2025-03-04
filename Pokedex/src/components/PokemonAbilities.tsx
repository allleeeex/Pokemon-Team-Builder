import './PokemonAbilities.css'

function capitaliseWords(string: string) {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function PokemonAbilites({abilities}) {
    return (
        <div className='overall-container'>
            <div className='title'>Abilities</div>
            <div className='line-separator'/>
            <div className='ability-container'>
                {abilities.map((ability) => (
                    <div>{capitaliseWords(ability.ability.name)}</div>
                ))}
            </div>
        </div>
    )
}

export default PokemonAbilites