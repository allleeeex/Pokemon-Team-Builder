// sadly abandoned to make it easier for trainees to understand

import './SearchBar.css'
import glass from '../assets/magnifyingglass.png'

function SearchBar({ onSearchChange } : { onSearchChange: (searchTerm: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <> 
            <div className="searchcontainer">
                <img src={glass} className="magnifying"></img>
                <input className="searchbar"
                    type="text"
                    placeholder="Search for a pokemon"
                    onChange={onSearchChange}
                />
            </div>
        </>
    )
}

export default SearchBar