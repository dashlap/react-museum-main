import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import Pagination from './components/Pagination';
import FilterMenu from './components/FilterMenu';
import { getPaintings } from './api';
import './style.css';

function App() {
    const [theme, setTheme] = useState('light-theme');
    const [searchValue, setSearchValue] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        artist: '',
        location: '',
        yearFrom: '',
        yearTo: ''
    });
    
    useEffect(() => {
        getPaintings().then(data => {
            setPaintings(data);
            setLoading(false);
        });
    }, []);
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme;
        } else {
            document.body.className = 'light-theme';
        }
    }, []);
    
    const toggleTheme = () => {
        const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem('site-theme', newTheme);
    };
    
    const getFilteredPaintings = () => {
        let filtered = paintings;
        
        // Search filter
        if (searchValue.trim()) {
            filtered = filtered.filter(painting =>
                painting.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                painting.artist.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        
        // Artist filter
        if (filters.artist) {
            filtered = filtered.filter(painting => painting.artist === filters.artist);
        }
        
        // Location filter
        if (filters.location) {
            filtered = filtered.filter(painting => painting.location === filters.location);
        }
        
        // Year range filter
        if (filters.yearFrom || filters.yearTo) {
            filtered = filtered.filter(painting => {
                const year = parseInt(painting.year);
                const from = filters.yearFrom ? parseInt(filters.yearFrom) : -Infinity;
                const to = filters.yearTo ? parseInt(filters.yearTo) : Infinity;
                return year >= from && year <= to;
            });
        }
        
        return filtered;
    };
    
    const filteredPaintings = getFilteredPaintings();
    const totalPages = Math.ceil(filteredPaintings.length / 6) || 1;
    
    if (loading) {
        return <div className="loading">Загрузка картин...</div>;
    }
    
    return (
        <div className="container">
            <Header theme={theme} onThemeToggle={toggleTheme} />
            <main>
                <Search
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    onFilterOpen={() => setIsFilterOpen(true)}
                />
                <Card paintings={filteredPaintings} currentPage={currentPage} />
                {totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </main>
            <FilterMenu 
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
                paintings={paintings}
            />
        </div>
    );
}

export default App;