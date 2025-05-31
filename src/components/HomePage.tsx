
import React from 'react';
import { ArrowRight, MapPin, Navigation, Star, Users, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Navigation,
      title: 'Smart Navigation',
      description: 'Get the best routes with real-time traffic updates and smart suggestions.'
    },
    {
      icon: MapPin,
      title: 'Discover Places',
      description: 'Explore restaurants, hotels, attractions, and hidden gems in your city.'
    },
    {
      icon: Star,
      title: 'Personalized Recommendations',
      description: 'AI-powered suggestions based on your preferences and location.'
    },
    {
      icon: Users,
      title: 'Community Reviews',
      description: 'Read authentic reviews and ratings from fellow travelers.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay updated with live information about places and services.'
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Your data is safe with us. Explore with confidence.'
    }
  ];

  const cities = [
    'Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 
    'Guntur', 'Warangal', 'Nellore', 'Kurnool'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">SUN</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Urban
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}Navigator
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover, explore, and navigate cities in Andhra Pradesh and Telangana like never before. 
              Find the best restaurants, hotels, attractions, and services with AI-powered recommendations.
            </p>

            {/* CTA Button */}
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Cities Preview */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">Available in these cities:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {cities.map((city) => (
                  <span 
                    key={city}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Smart Urban Navigator?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of urban exploration with our intelligent platform designed for modern travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">14+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Places Listed</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">User Reviews</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SUN</span>
            </div>
          </div>
          <p className="text-gray-400">
            © 2024 Smart Urban Navigator. Explore cities with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};
