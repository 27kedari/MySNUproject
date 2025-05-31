
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { getAllCities, getCityData, searchLocationsInCity, searchAllLocations, searchCities } from '@/data/andhrapradeshData';

interface SearchBarProps {
  onLocationSelect: (location: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const recentSearches = [
    { id: 'r1', name: 'Charminar', type: 'recent', city: 'Hyderabad' },
    { id: 'r2', name: 'RK Beach', type: 'recent', city: 'Visakhapatnam' },
    { id: 'r3', name: 'Tirumala Temple', type: 'recent', city: 'Tirupati' },
  ];

  useEffect(() => {
    if (query.length > 0) {
      const allSuggestions: any[] = [];
      
      // Search for cities first
      const matchingCities = searchCities(query);
      matchingCities.forEach(cityName => {
        allSuggestions.push({
          id: `city-${cityName}`,
          name: cityName,
          type: 'city',
          city: cityName,
          description: getCityData(cityName)?.description || ''
        });
      });
      
      // Search for locations across all cities
      const matchingLocations = searchAllLocations(query);
      matchingLocations.forEach(location => {
        allSuggestions.push({
          ...location,
          type: 'location'
        });
      });
      
      setSuggestions(allSuggestions.slice(0, 15)); // Limit to 15 results
      setIsOpen(true);
    } else {
      setSuggestions(recentSearches);
      setIsOpen(query === '' && document.activeElement === inputRef.current);
    }
  }, [query]);

  const handleSelect = (item: any) => {
    if (item.type === 'city') {
      // If it's a city, show all locations in that city
      const cityData = getCityData(item.name);
      if (cityData && cityData.locations.length > 0) {
        onLocationSelect({
          ...cityData.locations[0], // Select first location as default
          city: item.name,
          showAllInCity: true
        });
      }
    } else {
      // If it's a specific location
      onLocationSelect(item);
    }
    setQuery(item.name);
    setIsOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'city': return <MapPin className="w-4 h-4 text-blue-500" />;
      default: return <MapPin className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'city': return '🏙️ City';
      case 'restaurants': return '🍽️ Restaurant';
      case 'hotels': return '🏨 Hotel';
      case 'attractions': return '🎯 Attraction';
      case 'services': return '🏛️ Service';
      case 'transport': return '🚗 Transport';
      default: return '📍 Place';
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search cities, places, restaurants, hotels in Andhra Pradesh..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/90 backdrop-blur-sm"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {query === '' && (
            <div className="px-4 py-2 text-sm text-gray-500 border-b">
              Recent Searches
            </div>
          )}
          
          {suggestions.length > 0 ? (
            suggestions.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  {getTypeIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        {item.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">{item.rating}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 ml-2">
                        {getTypeLabel(item.type === 'city' ? 'city' : item.category)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {item.description}
                      </p>
                    )}
                    {item.address && (
                      <p className="text-xs text-gray-500 truncate">
                        {item.address}
                      </p>
                    )}
                    {item.city && item.type !== 'recent' && item.type !== 'city' && (
                      <p className="text-xs text-blue-600">
                        📍 {item.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : query.length > 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for cities like Hyderabad, Visakhapatnam, Vijayawada</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
