
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Clock, Users, Utensils, Building2, Car, Coffee } from 'lucide-react';
import { getCityData, searchLocationsInCity, type Location } from '@/data/andhrapradeshData';

interface CityExplorerProps {
  currentCity: string;
}

export const CityExplorer: React.FC<CityExplorerProps> = ({ currentCity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [cityData, setCityData] = useState<any>(null);
  const [filteredPlaces, setFilteredPlaces] = useState<Location[]>([]);

  const categories = [
    { id: 'all', label: 'All Places', icon: MapPin, color: 'bg-gray-100 text-gray-700' },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
    { id: 'hotels', label: 'Hotels', icon: Building2, color: 'bg-blue-100 text-blue-700' },
    { id: 'attractions', label: 'Attractions', icon: Star, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'services', label: 'Public Services', icon: Users, color: 'bg-green-100 text-green-700' },
    { id: 'transport', label: 'Transportation', icon: Car, color: 'bg-purple-100 text-purple-700' },
    { id: 'cafes', label: 'Cafes', icon: Coffee, color: 'bg-amber-100 text-amber-700' }
  ];

  useEffect(() => {
    const data = getCityData(currentCity);
    setCityData(data);
    if (data) {
      setFilteredPlaces(data.locations);
    }
  }, [currentCity]);

  useEffect(() => {
    if (!cityData) return;

    let filtered = cityData.locations;

    // Filter by search query
    if (searchQuery) {
      filtered = searchLocationsInCity(currentCity, searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((place: Location) => place.category === selectedCategory);
    }

    setFilteredPlaces(filtered);
  }, [searchQuery, selectedCategory, cityData, currentCity]);

  if (!cityData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">City not found</h2>
          <p className="text-gray-600">Sorry, we don't have data for "{currentCity}" yet.</p>
          <p className="text-sm text-gray-500 mt-2">Available cities: Hyderabad, Visakhapatnam, Vijayawada, Tirupati, Guntur</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore {currentCity}</h1>
              <p className="text-gray-600">{cityData.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>📍 {cityData.district || 'Andhra Pradesh'} District</span>
                <span>👥 Population: {cityData.population || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Currently in {currentCity}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants, hotels, attractions, services..."
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredPlaces.length} places found
          </h2>
          <p className="text-gray-600">
            {selectedCategory === 'all' ? 'All categories' : categories.find(c => c.id === selectedCategory)?.label}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={place.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{place.name}</h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{place.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{place.description}</p>

                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{place.address}</span>
                </div>

                {place.phone && (
                  <div className="text-sm text-gray-500 mb-2">
                    📞 {place.phone}
                  </div>
                )}

                {place.hours && (
                  <div className="flex items-center space-x-1 mb-3">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">{place.hours}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-3">
                  {(place.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  {place.priceRange && (
                    <span className="text-sm font-medium text-green-600">{place.priceRange}</span>
                  )}
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
