import './PokemonMoves.css';

function capitaliseWords(string: string) {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function PokemonMoves({ moves }) {
    return (
        <div className='overall-moves-container'>
            <div className='moves-title'>Moves It Can Learn</div>
            <div className='line-to-seperate'/>
            <div className='moves-table-container'>
                <table className='moves-table'>
                    <thead>
                        <tr>
                            <th className='row-width'>Move</th>
                            <th>Learn Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moves.map((move, index) => (
                            <tr key={index} className='row-width'>
                                <td>{capitaliseWords(move.move.name)}</td>
                                <td>{capitaliseWords(move.version_group_details[move.version_group_details.length-1].move_learn_method.name)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PokemonMoves;
