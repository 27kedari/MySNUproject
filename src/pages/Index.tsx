
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { CitySelector } from '@/components/CitySelector';
import { CityExplorer } from '@/components/CityExplorer';
import { MapView } from '@/components/MapView';
import { SearchBar } from '@/components/SearchBar';
import { NavigationSidebar } from '@/components/NavigationSidebar';
import { SmartRecommendations } from '@/components/SmartRecommendations';
import { AdminPanel } from '@/components/AdminPanel';
import { NotificationCenter } from '@/components/NotificationCenter';
import { RoutePanel } from '@/components/RoutePanel';
import { AnalyticsView } from '@/components/AnalyticsView';
import { SettingsView } from '@/components/SettingsView';
import { CityServices } from '@/components/CityServices';
import { UserProfile } from '@/components/UserProfile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HomePage } from '@/components/HomePage';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showHomePage, setShowHomePage] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeView, setActiveView] = useState('explore');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 17.3850, lng: 78.4867 });

  const handleLogin = (email: string, password: string) => {
    // Extract name from email for demo purposes, or use stored name
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const user = {
      name: name,
      email: email,
      city: 'Hyderabad'
    };
    setCurrentUser(user);
    setSelectedCity(user.city);
    setIsAuthenticated(true);
    setShowHomePage(false);
  };

  const handleSignup = (email: string, password: string, name: string, city: string) => {
    setAuthMode('login');
  };

  const handleGetStarted = () => {
    setShowHomePage(false);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setActiveView('explore');
    
    const cityCoordinates: Record<string, {lat: number, lng: number}> = {
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
      'Vijayawada': { lat: 16.5062, lng: 80.6480 },
      'Tirupati': { lat: 13.6288, lng: 79.4192 },
      'Guntur': { lat: 16.3067, lng: 80.4365 },
      'Nellore': { lat: 14.4426, lng: 79.9865 },
      'Kurnool': { lat: 15.8281, lng: 78.0373 },
      'Anantapur': { lat: 14.6819, lng: 77.6006 },
      'Warangal': { lat: 17.9669, lng: 79.5941 },
      'Rajahmundry': { lat: 17.0005, lng: 81.8040 },
      'Kakinada': { lat: 16.9891, lng: 82.2475 },
      'Machilipatnam': { lat: 16.1875, lng: 81.1389 },
      'Chittoor': { lat: 13.2172, lng: 79.1003 },
      'Kadapa': { lat: 14.4673, lng: 78.8242 }
    };
    
    if (cityCoordinates[city]) {
      setUserLocation(cityCoordinates[city]);
    }
  };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    if (activeView !== 'map') {
      setActiveView('map');
    }
  };

  const handleNavigateToPlace = (placeName: string) => {
    setActiveView('explore');
  };

  if (showHomePage) {
    return (
      <ScrollArea className="h-screen">
        <HomePage onGetStarted={handleGetStarted} />
      </ScrollArea>
    );
  }

  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <ScrollArea className="h-screen">
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        </ScrollArea>
      );
    } else {
      return (
        <ScrollArea className="h-screen">
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        </ScrollArea>
      );
    }
  }

  if (!selectedCity) {
    return (
      <ScrollArea className="h-screen">
        <CitySelector
          onCitySelect={handleCitySelect}
          currentCity={currentUser?.city}
        />
      </ScrollArea>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SUN</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Smart Urban Navigator
                </h1>
              </div>
              <div className="hidden md:block">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Change City: {selectedCity}
                </button>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <SearchBar onLocationSelect={handleLocationSelect} />
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <UserProfile currentUser={currentUser} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <NavigationSidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
        />

        <main className="flex-1 flex overflow-hidden">
          {activeView === 'explore' && (
            <ScrollArea className="flex-1">
              <CityExplorer currentCity={selectedCity} />
            </ScrollArea>
          )}

          {activeView === 'map' && (
            <>
              <div className="flex-1 relative">
                <MapView 
                  userLocation={userLocation}
                  selectedLocation={selectedLocation}
                  onLocationSelect={handleLocationSelect}
                />
              </div>

              {selectedLocation && (
                <ScrollArea className="w-96 bg-white border-l border-gray-200">
                  <RoutePanel 
                    destination={selectedLocation}
                    userLocation={userLocation}
                  />
                </ScrollArea>
              )}
            </>
          )}

          {activeView === 'recommendations' && (
            <ScrollArea className="flex-1">
              <SmartRecommendations 
                onNavigateToPlace={handleNavigateToPlace}
                currentCity={selectedCity}
              />
            </ScrollArea>
          )}

          {activeView === 'services' && (
            <ScrollArea className="flex-1">
              <CityServices />
            </ScrollArea>
          )}

          {activeView === 'analytics' && (
            <ScrollArea className="flex-1">
              <AnalyticsView currentCity={selectedCity} />
            </ScrollArea>
          )}

          {activeView === 'settings' && (
            <ScrollArea className="flex-1">
              <SettingsView currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </ScrollArea>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
