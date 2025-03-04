import './PokemonStats.css'

interface StatsArray {
    base_stat: number;
    effort: number;
    stat: StatType;
}

interface StatType {
    name: string;
    url: string;
}

function capitaliseWords(string: string) {
    if (string.toLocaleLowerCase() == 'hp') {
        return 'HP';
    }
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function PokemonStats({ stats } : { stats: StatsArray[] }) {
    const maxStatValue = Math.max(...stats.map(stat => stat.base_stat)) + 10;
    return (
        <div className='stats-container'>
            {stats.map((stat) => (
                <div className='bar-container'>
                    <div className='bar-label'>{capitaliseWords(stat.stat.name.replace('-', ' '))}:</div>
                    <div className='bar-number'>{stat.base_stat}</div>
                    <div className='bar-type' style={{ width:'100%' }}>
                    <div
                        className="bar-fill"
                        style={{ width: `${(stat.base_stat / maxStatValue) * 100}%` }}
                    ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PokemonStats