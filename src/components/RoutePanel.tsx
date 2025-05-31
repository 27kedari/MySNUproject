
import React, { useState, useEffect } from 'react';
import { Navigation, Clock, MapPin, Car, Bike, Footprints, Bus, Star, Phone, Globe, DollarSign } from 'lucide-react';

interface RoutePanelProps {
  destination: any;
  userLocation: { lat: number; lng: number };
}

export const RoutePanel: React.FC<RoutePanelProps> = ({ destination, userLocation }) => {
  const [transportMode, setTransportMode] = useState('walking');
  const [routeSteps, setRouteSteps] = useState<any[]>([]);
  
  const transportModes = [
    { id: 'walking', icon: Footprints, label: 'Walk', time: '25 min', distance: '2.1 km' },
    { id: 'bike', icon: Bike, label: 'Bike', time: '12 min', distance: '2.1 km' },
    { id: 'car', icon: Car, label: 'Drive', time: '8 min', distance: '2.3 km' },
    { id: 'transit', icon: Bus, label: 'Transit', time: '18 min', distance: '2.0 km' }
  ];

  useEffect(() => {
    // Generate route steps based on destination
    const generateRouteSteps = () => {
      if (!destination) return [];
      
      const steps = [
        { instruction: `Head towards ${destination.city} city center`, distance: '0.5 km', time: '6 min' },
        { instruction: `Continue on main road towards ${destination.name}`, distance: '1.2 km', time: '14 min' },
        { instruction: `Turn right when you see ${destination.category} signs`, distance: '0.4 km', time: '5 min' },
        { instruction: `Arrive at ${destination.name}`, distance: '0 km', time: '0 min' }
      ];
      
      return steps;
    };
    
    setRouteSteps(generateRouteSteps());
  }, [destination]);

  const nearbyPlaces = [
    { name: 'Local Restaurant', type: 'Restaurant', distance: '100m', rating: 4.2 },
    { name: 'ATM', type: 'Banking', distance: '150m', rating: 4.0 },
    { name: 'Parking Area', type: 'Parking', distance: '80m', rating: 4.1 },
    { name: 'Tourist Information', type: 'Service', distance: '200m', rating: 4.3 }
  ];

  const handleStartNavigation = () => {
    // In a real app, this would open navigation app or start turn-by-turn directions
    console.log(`Starting navigation to ${destination.name}`);
    alert(`Navigation started to ${destination.name}. In a real app, this would open your preferred navigation app.`);
  };

  if (!destination) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Select a destination</p>
          <p className="text-sm">Choose a place on the map to see route details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900">{destination.name}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-2">{destination.address}</p>
        <p className="text-xs text-blue-600 mb-2">📍 {destination.city}</p>
        
        {destination.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{destination.rating}</span>
            <span className="text-sm text-gray-500">(Reviews)</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {destination.category}
          </span>
          {destination.price && (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center space-x-1">
              <DollarSign className="w-3 h-3" />
              <span>{destination.price}</span>
            </span>
          )}
        </div>
      </div>

      {/* Contact Information */}
      {(destination.phone || destination.website || destination.timings) && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact & Info</h3>
          <div className="space-y-2">
            {destination.phone && (
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{destination.phone}</span>
              </div>
            )}
            {destination.website && (
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={destination.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Visit Website
                </a>
              </div>
            )}
            {destination.timings && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{destination.timings}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transport Mode Selection */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Transportation</h3>
        <div className="grid grid-cols-2 gap-2">
          {transportModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setTransportMode(mode.id)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  transportMode === mode.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{mode.label}</div>
                <div className="text-xs text-gray-500">{mode.time}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Route Summary</h3>
          <button 
            onClick={handleStartNavigation}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Start Navigation</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{transportModes.find(m => m.id === transportMode)?.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{transportModes.find(m => m.id === transportMode)?.distance}</span>
          </div>
        </div>
      </div>

      {/* Route Steps */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Directions</h3>
          <div className="space-y-3">
            {routeSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{step.instruction}</p>
                  <p className="text-xs text-gray-500">{step.distance} • {step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Places */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Nearby Services</h3>
          <div className="space-y-2">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{place.name}</p>
                  <p className="text-xs text-gray-500">{place.type} • {place.distance}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500">{place.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
