
import React, { useState, useCallback } from 'react';
import { MapPin, Navigation, Plus, Minus, RotateCcw } from 'lucide-react';
import { getAllCities, getCityData } from '@/data/andhrapradeshData';

interface MapViewProps {
  userLocation: { lat: number; lng: number };
  selectedLocation: any;
  onLocationSelect: (location: any) => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  userLocation, 
  selectedLocation, 
  onLocationSelect 
}) => {
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState(userLocation);
  const [landmarks, setLandmarks] = useState(() => {
    const allLandmarks: any[] = [];
    getAllCities().forEach(cityName => {
      const cityData = getCityData(cityName);
      if (cityData) {
        cityData.locations.forEach(location => {
          allLandmarks.push({
            ...location,
            city: cityName
          });
        });
      }
    });
    return allLandmarks;
  });

  // Convert lat/lng to pixel coordinates for our custom map
  const getPixelPosition = useCallback((lat: number, lng: number) => {
    // Simple projection for Andhra Pradesh region
    const bounds = {
      north: 19.9,
      south: 12.6,
      east: 84.8,
      west: 76.8
    };
    
    const mapWidth = 100; // percentage
    const mapHeight = 100; // percentage
    
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * mapWidth;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * mapHeight;
    
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) };
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 12));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 4));
  const handleRecenter = () => setCenter(userLocation);

  const handleLocationClick = (landmark: any) => {
    onLocationSelect({ ...landmark, city: landmark.city });
    setCenter(landmark.coordinates);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full relative" style={{ 
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(236, 254, 255, 0.5) 0%, rgba(240, 253, 244, 0.5) 100%)
          `
        }}>
          {/* State Outline */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M20,10 L80,15 L85,40 L75,80 L25,85 L15,50 Z"
              fill="rgba(59, 130, 246, 0.1)"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>

      {/* User Location */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          left: `${getPixelPosition(userLocation.lat, userLocation.lng).x}%`,
          top: `${getPixelPosition(userLocation.lat, userLocation.lng).y}%`
        }}
      >
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Your Location
          </div>
        </div>
      </div>

      {/* Landmarks */}
      {landmarks.map((landmark) => {
        const position = getPixelPosition(landmark.coordinates.lat, landmark.coordinates.lng);
        const isSelected = selectedLocation?.id === landmark.id;
        
        return (
          <div
            key={landmark.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
            onClick={() => handleLocationClick(landmark)}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              isSelected 
                ? 'bg-yellow-500 scale-125 ring-4 ring-yellow-300' 
                : 'bg-red-500 hover:bg-red-600 hover:scale-110'
            }`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
              <div className="font-medium">{landmark.name}</div>
              <div className="text-gray-300">{landmark.city}</div>
              <div className="text-gray-400">⭐ {landmark.rating}</div>
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-30 space-y-2">
        <button 
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleRecenter}
          className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* City Labels */}
      {getAllCities().map((cityName) => {
        const cityData = getCityData(cityName);
        if (!cityData) return null;
        
        const position = getPixelPosition(cityData.coordinates.lat, cityData.coordinates.lng);
        
        return (
          <div
            key={cityName}
            className="absolute transform -translate-x-1/2 z-5 pointer-events-none"
            style={{
              left: `${position.x}%`,
              top: `${position.y - 3}%`
            }}
          >
            <div className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded shadow-sm">
              {cityName}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <h3 className="text-sm font-semibold mb-2">Andhra Pradesh Explorer</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Points of Interest ({landmarks.length})</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Selected Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Cities: {getAllCities().length}</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Zoom: {zoom}x | Interactive Map View
          </div>
        </div>
      </div>

      {/* Selected Location Highlight */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg max-w-sm z-20">
          <h3 className="font-semibold">{selectedLocation.name}</h3>
          <p className="text-sm opacity-90">{selectedLocation.city}</p>
          <p className="text-xs opacity-75 mt-1">{selectedLocation.description}</p>
          {selectedLocation.rating && (
            <div className="flex items-center space-x-1 mt-2">
              <span className="text-yellow-300">⭐</span>
              <span className="text-sm">{selectedLocation.rating}</span>
            </div>
          )}
          {selectedLocation.priceRange && (
            <div className="text-xs mt-1 bg-blue-700 px-2 py-1 rounded">
              {selectedLocation.priceRange}
            </div>
          )}
        </div>
      )}

      {/* Map Status */}
      <div className="absolute bottom-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
        ✓ Interactive Map Active
      </div>
    </div>
  );
};
