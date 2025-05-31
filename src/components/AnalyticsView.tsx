
import React from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Star, Calendar } from 'lucide-react';
import { getCityData, getAllCities } from '@/data/andhrapradeshData';

interface AnalyticsViewProps {
  currentCity: string;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ currentCity }) => {
  const cityData = getCityData(currentCity);
  const allCities = getAllCities();
  
  const analyticsData = {
    totalCities: allCities.length,
    totalLocations: allCities.reduce((sum, city) => {
      const data = getCityData(city);
      return sum + (data ? data.locations.length : 0);
    }, 0),
    averageRating: 4.2,
    topCategories: [
      { name: 'Attractions', count: 15, color: 'bg-blue-500' },
      { name: 'Restaurants', count: 8, color: 'bg-green-500' },
      { name: 'Hotels', count: 10, color: 'bg-purple-500' },
      { name: 'Services', count: 5, color: 'bg-orange-500' },
      { name: 'Transport', count: 3, color: 'bg-red-500' }
    ]
  };

  const cityStats = cityData ? {
    locations: cityData.locations.length,
    avgRating: (cityData.locations.reduce((sum, loc) => sum + loc.rating, 0) / cityData.locations.length).toFixed(1),
    categories: cityData.locations.reduce((acc: any, loc) => {
      acc[loc.category] = (acc[loc.category] || 0) + 1;
      return acc;
    }, {})
  } : null;

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Insights and statistics for Andhra Pradesh cities</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cities</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCities}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Locations</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalLocations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current City Stats */}
          {cityStats && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentCity} Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Locations</span>
                  <span className="text-lg font-semibold text-gray-900">{cityStats.locations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="text-lg font-semibold text-gray-900">{cityStats.avgRating} ⭐</span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                  <div className="space-y-2">
                    {Object.entries(cityStats.categories).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{category}</span>
                        <span className="text-sm font-medium text-gray-900">{count as number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Distribution
            </h3>
            <div className="space-y-4">
              {analyticsData.topCategories.map((category) => (
                <div key={category.name} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${(category.count / analyticsData.totalLocations) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">New location added: Charminar</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">User searched for "Visakhapatnam hotels"</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Rating updated for Paradise Restaurant</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* City Rankings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              City Rankings by Locations
            </h3>
            <div className="space-y-3">
              {allCities.slice(0, 5).map((city, index) => {
                const data = getCityData(city);
                const locationCount = data ? data.locations.length : 0;
                return (
                  <div key={city} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <span className="text-sm font-medium text-gray-900">{city}</span>
                    </div>
                    <span className="text-sm text-gray-600">{locationCount} locations</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
