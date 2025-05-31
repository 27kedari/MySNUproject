
import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Utensils, 
  Coffee, 
  Building, 
  Camera,
  TrendingUp,
  Users,
  ThumbsUp,
  Navigation,
  Filter,
  Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SmartRecommendationsProps {
  onNavigateToPlace?: (placeName: string) => void;
  currentCity?: string;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ 
  onNavigateToPlace, 
  currentCity = 'Hyderabad' 
}) => {
  const [activeCategory, setActiveCategory] = useState('trending');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['4+ Rating']);
  const [showFilters, setShowFilters] = useState(false);

  const allCitiesData = {
    'Hyderabad': {
      trending: [
        {
          name: 'Charminar Heritage Walk',
          type: 'Historical Site',
          rating: 4.8,
          reviews: 2847,
          distance: '2.5 km',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format',
          tags: ['Historical', 'Photography', 'Cultural'],
          timeToVisit: '2-3 hours'
        },
        {
          name: 'Paradise Biryani',
          type: 'Restaurant',
          rating: 4.6,
          reviews: 5234,
          distance: '1.2 km',
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d321?w=400&h=300&fit=crop&auto=format',
          tags: ['Biryani', 'Local Cuisine', 'Family'],
          timeToVisit: '1-2 hours'
        },
        {
          name: 'Tank Bund Promenade',
          type: 'Recreation',
          rating: 4.4,
          reviews: 1876,
          distance: '3.1 km',
          image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0e925?w=400&h=300&fit=crop&auto=format',
          tags: ['Walking', 'Sunset', 'Lake View'],
          timeToVisit: '1-2 hours'
        }
      ]
    },
    'Visakhapatnam': {
      trending: [
        {
          name: 'RK Beach',
          type: 'Beach',
          rating: 4.5,
          reviews: 3421,
          distance: '1.8 km',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&auto=format',
          tags: ['Beach', 'Sunset', 'Walking'],
          timeToVisit: '2-3 hours'
        },
        {
          name: 'Submarine Museum',
          type: 'Museum',
          rating: 4.3,
          reviews: 1892,
          distance: '4.2 km',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&auto=format',
          tags: ['Museum', 'History', 'Educational'],
          timeToVisit: '1-2 hours'
        }
      ]
    },
    'Vijayawada': {
      trending: [
        {
          name: 'Kanaka Durga Temple',
          type: 'Temple',
          rating: 4.7,
          reviews: 4532,
          distance: '2.1 km',
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop&auto=format',
          tags: ['Temple', 'Spiritual', 'Scenic'],
          timeToVisit: '2-3 hours'
        },
        {
          name: 'Krishna River Cruise',
          type: 'Recreation',
          rating: 4.4,
          reviews: 2156,
          distance: '3.5 km',
          image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop&auto=format',
          tags: ['River', 'Cruise', 'Scenic'],
          timeToVisit: '2-3 hours'
        }
      ]
    }
  };

  const personalizedSuggestions = [
    {
      name: 'Cafe Coffee Day - Jubilee Hills',
      type: 'Cafe',
      rating: 4.3,
      reviews: 892,
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format',
      reason: 'Based on your coffee preferences',
      tags: ['Coffee', 'WiFi', 'Study Spot']
    },
    {
      name: 'Ramoji Film City',
      type: 'Entertainment',
      rating: 4.7,
      reviews: 3421,
      distance: '25.6 km',
      image: 'https://images.unsplash.com/photo-1489599856729-1b87b8b7e79e?w=400&h=300&fit=crop&auto=format',
      reason: 'Popular weekend destination',
      tags: ['Family', 'Entertainment', 'Full Day']
    },
    {
      name: 'Local Street Food Tour',
      type: 'Food Experience',
      rating: 4.8,
      reviews: 1567,
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format',
      reason: 'Based on your food interests',
      tags: ['Street Food', 'Local', 'Adventure']
    }
  ];

  const hiddenGems = [
    {
      name: 'Online Chess - Chess.com',
      type: 'Game',
      rating: 4.5,
      reviews: 12340,
      distance: 'Online',
      image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132ac11?w=400&h=300&fit=crop&auto=format',
      tags: ['Strategy', 'Mind Game', 'Free'],
      hiddenGem: true,
      url: 'https://chess.com'
    },
    {
      name: 'Puzzle Games - Jigsaw Planet',
      type: 'Game',
      rating: 4.3,
      reviews: 8765,
      distance: 'Online',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop&auto=format',
      tags: ['Puzzle', 'Relaxing', 'Free'],
      hiddenGem: true,
      url: 'https://jigsawplanet.com'
    },
    {
      name: 'Word Games - Wordle',
      type: 'Game',
      rating: 4.6,
      reviews: 15432,
      distance: 'Online',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=300&fit=crop&auto=format',
      tags: ['Word Game', 'Daily', 'Free'],
      hiddenGem: true,
      url: 'https://nytimes.com/games/wordle'
    },
    {
      name: 'Shilparamam Arts & Crafts Village',
      type: 'Cultural Center',
      rating: 4.5,
      reviews: 1234,
      distance: '4.2 km',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&auto=format',
      tags: ['Art', 'Shopping', 'Cultural'],
      hiddenGem: true
    }
  ];

  const categories = [
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'personalized', label: 'For You', icon: Users },
    { id: 'hidden', label: 'Hidden Gems', icon: Camera }
  ];

  const filterOptions = [
    'Restaurants', 'Hotels', 'Attractions', 'Games', '< 5km', '< 10km', '4+ Rating', '4.5+ Rating', 'Free'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getCurrentTrending = () => {
    return allCitiesData[currentCity as keyof typeof allCitiesData]?.trending || allCitiesData['Hyderabad'].trending;
  };

  const renderPlaceCard = (place: any, showReason = false) => (
    <div key={place.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={place.image} 
          alt={place.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format';
          }}
        />
        {place.hiddenGem && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Hidden Gem
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          {place.distance}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
            <p className="text-sm text-gray-500">{place.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{place.rating}</span>
            <span className="text-sm text-gray-500">({place.reviews})</span>
          </div>
          {place.timeToVisit && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{place.timeToVisit}</span>
            </div>
          )}
        </div>

        {showReason && place.reason && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">{place.reason}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {place.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-2">
          {place.url ? (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(place.url, '_blank')}
            >
              <Gamepad2 className="w-4 h-4 mr-1" />
              Play Game
            </Button>
          ) : (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onNavigateToPlace && onNavigateToPlace(place.name)}
            >
              <Navigation className="w-4 h-4 mr-1" />
              Navigate
            </Button>
          )}
          <Button size="sm" variant="outline">
            <ThumbsUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Recommendations</h1>
          <p className="text-gray-600">Discover amazing places tailored to your preferences in {currentCity}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-600">Trending Places</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Personalized</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Camera className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Hidden Gems</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5km</p>
                <p className="text-sm text-gray-600">Search Radius</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-blue-50 border-blue-200' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            {selectedFilters.map(filter => (
              <span 
                key={filter}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                onClick={() => toggleFilter(filter)}
              >
                {filter} ×
              </span>
            ))}
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {filterOptions.map(filter => (
                  <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => toggleFilter(filter)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{filter}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeCategory === 'trending' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🔥 Trending in {currentCity}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentTrending().map(place => renderPlaceCard(place))}
            </div>
          </div>
        )}

        {activeCategory === 'personalized' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">✨ Personalized for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalizedSuggestions.map(place => renderPlaceCard(place, true))}
            </div>
          </div>
        )}

        {activeCategory === 'hidden' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">💎 Hidden Gems & Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hiddenGems.map(place => renderPlaceCard(place))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
