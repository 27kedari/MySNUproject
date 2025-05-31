
import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Clock } from 'lucide-react';
import { getAllCities, searchCities } from '@/data/andhrapradeshData';

interface CitySelectorProps {
  onCitySelect: (city: string) => void;
  currentCity?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect, currentCity }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularCities = [
    { name: 'Hyderabad', state: 'Telangana', image: '/placeholder.svg', description: 'IT hub and historic city' },
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Port city with beautiful beaches' },
    { name: 'Vijayawada', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Commercial hub on Krishna River' },
    { name: 'Tirupati', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Famous pilgrimage destination' },
    { name: 'Guntur', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Agricultural and spice trading center' },
    { name: 'Warangal', state: 'Telangana', image: '/placeholder.svg', description: 'Historic city with Kakatiya heritage' },
    { name: 'Rajahmundry', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Cultural capital on Godavari river' },
    { name: 'Kakinada', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Coastal city with Hope Island' },
    { name: 'Nellore', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Known for aquaculture and agriculture' },
    { name: 'Kurnool', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Historic city with Belum Caves' },
    { name: 'Anantapur', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Home to Lepakshi Temple' },
    { name: 'Machilipatnam', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Historic port with Kalamkari art' },
    { name: 'Chittoor', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Gateway to Tirupati with mango orchards' },
    { name: 'Kadapa', state: 'Andhra Pradesh', image: '/placeholder.svg', description: 'Historic city near Gandikota canyon' }
  ];

  const recentSearches = [
    'Visakhapatnam',
    'Vijayawada',
    'Tirupati',
    'Warangal'
  ];

  const filteredCities = searchQuery 
    ? searchCities(searchQuery).map(cityName => 
        popularCities.find(city => city.name === cityName) || 
        { name: cityName, state: 'Andhra Pradesh/Telangana', image: '/placeholder.svg', description: 'City in the region' }
      )
    : popularCities;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Which city are you exploring?
          </h1>
          <p className="text-xl text-gray-600">
            Discover cities in Andhra Pradesh and Telangana with comprehensive information about restaurants, hotels, attractions, and services
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for cities in Andhra Pradesh and Telangana..."
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
          />
        </div>

        {/* Current City */}
        {currentCity && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Current City
            </h2>
            <button
              onClick={() => onCitySelect(currentCity)}
              className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">{currentCity}</h3>
                  <p className="text-blue-700 text-sm">Continue exploring</p>
                </div>
                <div className="text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && searchQuery === '' && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-600" />
              Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((city) => (
                <button
                  key={city}
                  onClick={() => onCitySelect(city)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            {searchQuery ? 'Search Results' : 'Available Cities'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => onCitySelect(city.name)}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{city.state}</p>
                  <p className="text-sm text-gray-600">{city.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {searchQuery && filteredCities.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-600">Try searching for a different city name</p>
            <button
              onClick={() => onCitySelect(searchQuery)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore "{searchQuery}" anyway
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
