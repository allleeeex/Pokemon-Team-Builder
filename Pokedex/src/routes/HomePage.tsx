import { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import PokemonList from '../components/PokemonList'
import glass from '../assets/magnifyingglass.png'
import ProfileBox from '../components/ProfileBox'
import { useAuth } from './AuthContext';
import './HomePage.css'
import TeamBuilderList from '../components/TeamBuilderList'

interface pokemonData {
    name: string;
    url: string;
}

function HomePage() {
    const [pokemonData, setPokemonData] = useState<pokemonData[]>([]);
    const[apiUrl, setApiUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=100');
    const [showBuilder, setShowBuilder] = useState<boolean>(false);
    const { auth } = useAuth();
    const [showBox, setShowBox] = useState(false);

    const handleClick = () => {
        setShowBox(prev => !prev);
    };

    useEffect(() => {
        async function fetchPokemon() {
            let url = apiUrl; 
            if (url == 'lets build a team') {
                setShowBuilder(true);
            } else {
                setShowBuilder(false);
            }
            let fetchedPokemon: pokemonData[] = [];  
            try {
                while (url) {
                    const response = await fetch(url);
                    const data = await response.json();
                    fetchedPokemon = fetchedPokemon.concat(data.results);
                    url = data.next;
                }      
                setPokemonData(fetchedPokemon);
            } catch (error) {
                console.error('Error fetching Pokémon:', error);
            }
        }
    
        fetchPokemon();
    }, [apiUrl]);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch =(event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    const filteredPokemon = pokemonData.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    const handleIconClick = (newUrl: string) => {
        setApiUrl(newUrl);
    }
      
    return (
        <div className="flex"> 
            <Sidebar onIconClick={handleIconClick}/>
            <div className="main-content">
                <div className="absolute">
                    <div className="top-bar">
                        <div className="main-title">Alex's Pokedex</div>
                        <div style={{ marginRight: '57%' }}/>
                        <ProfileBox onClick={handleClick}/>
                            {showBox && (
                            <div
                            style={{
                                border: '1px solid blue',
                                marginTop: '10px',
                                padding: '10px',
                                width: '200px',
                            }}
                            >
                                I am the box that appears below!
                            </div>
                        )}
                    </div>
                    <div className="searchcontainer">
                        <img src={glass} className="magnifying"/>
                        <input className="searchbar"
                            type="text"
                            placeholder="Search for a pokemon"
                            onChange={e => handleSearch(e)}
                        />
                    </div>
                </div>
                <div style={{paddingTop: '13%'}}/>
                {showBuilder ? (
                    auth.token ? (
                        <TeamBuilderList />
                    ) : (
                        <>Log In To Use This Feature</>
                    )
                ) : (
                    <PokemonList pokemonData={filteredPokemon} />
                )}
            </div>
        </div>
    )
}

export default HomePage