import React, { useState, useMemo } from 'react';

function FilterMenu({ isOpen, onClose, filters, onFilterChange, paintings }) {
    const [isArtistOpen, setIsArtistOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isYearsOpen, setIsYearsOpen] = useState(false);
    
    // Extract unique values from paintings
    const uniqueArtists = useMemo(() => {
        const artists = paintings?.map(p => p.artist) || [];
        return [...new Set(artists)].filter(Boolean).sort();
    }, [paintings]);
    
    const uniqueLocations = useMemo(() => {
        const locations = paintings?.map(p => p.location) || [];
        return [...new Set(locations)].filter(Boolean).sort();
    }, [paintings]);
    
    const handleArtistChange = (e) => {
        onFilterChange({
            ...filters,
            artist: e.target.value
        });
    };
    
    const handleLocationChange = (e) => {
        onFilterChange({
            ...filters,
            location: e.target.value
        });
    };
    
    const handleYearFromChange = (e) => {
        onFilterChange({
            ...filters,
            yearFrom: e.target.value
        });
    };
    
    const handleYearToChange = (e) => {
        onFilterChange({
            ...filters,
            yearTo: e.target.value
        });
    };
    
    const handleClear = () => {
        onFilterChange({
            artist: '',
            location: '',
            yearFrom: '',
            yearTo: ''
        });
    };
    
    if (!isOpen) return null;
    
    return (
        <>
            <div className="filter-overlay" onClick={onClose} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999
            }}></div>
            <div className="filter-menu active" style={{ position: 'fixed', right: 0, zIndex: 1000 }}>
                <div className="filter-menu-header">
                    <button className="filter-close" onClick={onClose}>✕</button>
                </div>
                
                <div className="filter-menu-content">
                    <div className="filter-category">
                        <div className="filter-category-header">
                            <span>ARTIST</span>
                            <button className="filter-expand" onClick={() => setIsArtistOpen(!isArtistOpen)}>
                                {isArtistOpen ? '−' : '+'}
                            </button>
                        </div>
                        {isArtistOpen && (
                            <div className="filter-category-content">
                                <select className="filter-select" value={filters.artist} onChange={handleArtistChange}>
                                    <option value="">Select the artist</option>
                                    {uniqueArtists.map(artist => (
                                        <option key={artist} value={artist}>{artist}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-category">
                        <div className="filter-category-header">
                            <span>LOCATION</span>
                            <button className="filter-expand" onClick={() => setIsLocationOpen(!isLocationOpen)}>
                                {isLocationOpen ? '−' : '+'}
                            </button>
                        </div>
                        {isLocationOpen && (
                            <div className="filter-category-content">
                                <select className="filter-select" value={filters.location} onChange={handleLocationChange}>
                                    <option value="">Select the location</option>
                                    {uniqueLocations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="filter-category">
                        <div className="filter-category-header">
                            <span>YEARS</span>
                            <button className="filter-expand" onClick={() => setIsYearsOpen(!isYearsOpen)}>
                                {isYearsOpen ? '−' : '+'}
                            </button>
                        </div>
                        {isYearsOpen && (
                            <div className="filter-category-content">
                                <div className="year-inputs">
                                    <input 
                                        type="text" 
                                        placeholder="From" 
                                        value={filters.yearFrom}
                                        onChange={handleYearFromChange}
                                    />
                                    <span>—</span>
                                    <input 
                                        type="text" 
                                        placeholder="To"
                                        value={filters.yearTo}
                                        onChange={handleYearToChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="filter-menu-footer">
                    <button className="filter-results" onClick={onClose}>SHOW THE RESULTS</button>
                    <button className="filter-close-bottom" onClick={handleClear}>CLEAR</button>
                </div>
            </div>
        </>
    );
}

export default FilterMenu;