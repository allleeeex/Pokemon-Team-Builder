import  './PokemonName.css'

interface PokemonNameProps {
    name: string;
}

const PokemonName: React.FC<PokemonNameProps> = ({ name }) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalisedName = capitalizeFirstLetter(name);

    return (
        <div className='pokemon-name'>{capitalisedName}</div>
    );
};

export default PokemonName