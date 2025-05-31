import React, { useState } from 'react';
import { User, Settings, LogOut, MapPin, Clock, Star, Heart, Navigation, Edit, Camera, Bell, Shield } from 'lucide-react';

interface UserProfileProps {
  currentUser: {
    name: string;
    email: string;
    city: string;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user] = useState({
    name: currentUser?.name || 'User',
    email: currentUser?.email || 'user@example.com',
    avatar: null,
    city: currentUser?.city || 'Hyderabad',
    joinDate: 'March 2023',
    lastActive: '15 minutes ago',
    membershipLevel: 'Gold Explorer',
    preferences: {
      transportation: 'car',
      notifications: true,
      dataSharing: false,
      language: 'English',
      theme: 'light',
      cuisinePreferences: ['South Indian', 'North Indian', 'Continental'],
      budgetRange: '₹2000-5000',
      travelStyle: 'Cultural & Heritage'
    },
    stats: {
      routesPlanned: 47,
      placesVisited: 28,
      totalDistance: '342 km',
      citiesExplored: 6,
      reviewsWritten: 15,
      photosUploaded: 32,
      friendsConnected: 18,
      pointsEarned: 2840,
      badgesUnlocked: 8,
      checkIns: 35
    },
    recentActivity: [
      { id: 1, type: 'visit', place: 'Ramoji Film City', city: 'Hyderabad', time: '2h ago', rating: 4.8, category: 'attractions' },
      { id: 2, type: 'save', place: 'Araku Valley Coffee Plantations', city: 'Visakhapatnam', time: '5h ago', rating: null, category: 'attractions' },
      { id: 3, type: 'route', place: 'Salar Jung Museum', city: 'Hyderabad', time: '1d ago', rating: null, category: 'attractions' },
      { id: 4, type: 'review', place: 'Absolute Barbecues', city: 'Hyderabad', time: '2d ago', rating: 4.5, category: 'restaurants' },
      { id: 5, type: 'visit', place: 'Borra Caves', city: 'Visakhapatnam', time: '3d ago', rating: 4.6, category: 'attractions' },
      { id: 6, type: 'checkin', place: 'Hussain Sagar Lake', city: 'Hyderabad', time: '4d ago', rating: 4.3, category: 'attractions' },
    ],
    savedPlaces: [
      { id: 1, name: 'Golconda Fort', city: 'Hyderabad', category: 'attractions', rating: 4.4, saved: '1d ago', notes: 'Perfect for evening visit' },
      { id: 2, name: 'Submarine Museum', city: 'Visakhapatnam', category: 'attractions', rating: 4.2, saved: '3d ago', notes: 'Unique experience' },
      { id: 3, name: 'Kanipakam Temple', city: 'Chittoor', category: 'attractions', rating: 4.7, saved: '1w ago', notes: 'Religious significance' },
      { id: 4, name: 'Spice Garden Restaurant', city: 'Vijayawada', category: 'restaurants', rating: 4.3, saved: '1w ago', notes: 'Authentic Andhra cuisine' },
      { id: 5, name: 'Haritha Hotel', city: 'Araku', category: 'hotels', rating: 4.1, saved: '2w ago', notes: 'Mountain view rooms' },
      { id: 6, name: 'Papi Hills', city: 'East Godavari', category: 'attractions', rating: 4.5, saved: '2w ago', notes: 'Boat ride essential' },
    ],
    achievements: [
      { id: 1, title: 'City Explorer', description: 'Visited 25+ places', icon: '🗺️', unlocked: true, date: '2023-12-15' },
      { id: 2, title: 'Heritage Hunter', description: 'Explored 10+ historical sites', icon: '🏛️', unlocked: true, date: '2023-11-20' },
      { id: 3, title: 'Foodie Traveler', description: 'Reviewed 15+ restaurants', icon: '🍽️', unlocked: true, date: '2023-10-30' },
      { id: 4, title: 'Route Master', description: 'Planned 40+ routes', icon: '🧭', unlocked: true, date: '2023-09-18' },
      { id: 5, title: 'Social Explorer', description: 'Connected with 15+ travelers', icon: '👥', unlocked: true, date: '2023-08-25' },
      { id: 6, title: 'Photo Journalist', description: 'Uploaded 30+ photos', icon: '📸', unlocked: true, date: '2023-07-12' },
      { id: 7, title: 'Temple Hopper', description: 'Visited 20+ temples', icon: '🕉️', unlocked: true, date: '2023-06-08' },
      { id: 8, title: 'Beach Lover', description: 'Explored 5+ beaches', icon: '🏖️', unlocked: true, date: '2023-05-15' },
      { id: 9, title: 'Mountain Climber', description: 'Visited 10+ hill stations', icon: '⛰️', unlocked: false, progress: 70 },
      { id: 10, title: 'Cultural Ambassador', description: 'Share 50+ cultural insights', icon: '🎭', unlocked: false, progress: 45 },
    ],
    travelGoals: [
      { id: 1, title: 'Complete AP Circuit', description: 'Visit all major cities in Andhra Pradesh', progress: 75, target: 'Dec 2024' },
      { id: 2, title: 'Temple Trail', description: 'Visit 50 famous temples', progress: 60, target: 'Jun 2024' },
      { id: 3, title: 'Coastal Explorer', description: 'Explore entire AP coastline', progress: 40, target: 'Mar 2024' },
    ]
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visit': return <MapPin className="w-4 h-4 text-green-500" />;
      case 'save': return <Heart className="w-4 h-4 text-red-500" />;
      case 'route': return <Navigation className="w-4 h-4 text-blue-500" />;
      case 'review': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'checkin': return <Clock className="w-4 h-4 text-purple-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleSignOut = () => {
    console.log('Signing out...');
    setIsOpen(false);
    alert('Sign out functionality would be implemented here');
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    alert('Profile editing would open here');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'achievements', label: 'Badges', icon: Star },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
          {/* Profile Header */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100">
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-blue-100 text-sm">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{user.city}</span>
                  <span className="text-blue-200">•</span>
                  <span className="text-sm">{user.membershipLevel}</span>
                </div>
                <div className="text-xs text-blue-200 mt-1">
                  Joined {user.joinDate} • {user.stats.pointsEarned} points
                </div>
              </div>
              <button 
                onClick={handleEditProfile}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="p-4 space-y-4">
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{user.stats.routesPlanned}</div>
                    <div className="text-xs text-gray-500">Routes</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{user.stats.placesVisited}</div>
                    <div className="text-xs text-gray-500">Visited</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{user.stats.citiesExplored}</div>
                    <div className="text-xs text-gray-500">Cities</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{user.stats.reviewsWritten}</div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{user.stats.photosUploaded}</div>
                    <div className="text-xs text-gray-500">Photos</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">{user.stats.badgesUnlocked}</div>
                    <div className="text-xs text-gray-500">Badges</div>
                  </div>
                </div>

                {/* Travel Goals */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Travel Goals</h4>
                  {user.travelGoals.map((goal) => (
                    <div key={goal.id} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{goal.title}</span>
                        <span className="text-xs text-gray-500">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Target: {goal.target}</div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Quick Actions</h4>
                  <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Account Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Notification Preferences</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Privacy Settings</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  {user.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          {activity.type === 'visit' && 'Visited '}
                          {activity.type === 'save' && 'Saved '}
                          {activity.type === 'route' && 'Planned route to '}
                          {activity.type === 'review' && 'Reviewed '}
                          {activity.type === 'checkin' && 'Checked in at '}
                          <span className="font-medium">{activity.place}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.city} • {activity.time}</p>
                        {activity.rating && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{activity.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Saved Places ({user.savedPlaces.length})</h4>
                <div className="space-y-2">
                  {user.savedPlaces.map((place) => (
                    <div key={place.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Heart className="w-4 h-4 text-red-500 fill-current mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{place.name}</p>
                            <p className="text-xs text-gray-500">{place.city} • {place.saved}</p>
                            {place.notes && (
                              <p className="text-xs text-blue-600 mt-1">💡 {place.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{place.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Achievements & Badges</h4>
                <div className="space-y-2">
                  {user.achievements.map((achievement) => (
                    <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${
                      achievement.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}>
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">Earned on {achievement.date}</p>
                        )}
                        {!achievement.unlocked && achievement.progress && (
                          <div className="mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{achievement.progress}% complete</p>
                          </div>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <div className="text-green-600">
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
