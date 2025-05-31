
import React from 'react';
import { Map, Compass, Users, Settings, BarChart3, Lightbulb } from 'lucide-react';

interface NavigationSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeView,
  onViewChange
}) => {
  const menuItems = [
    { id: 'explore', label: 'City Explorer', icon: Compass },
    { id: 'map', label: 'Map & Routes', icon: Map },
    { id: 'recommendations', label: 'Smart Recommendations', icon: Lightbulb },
    { id: 'services', label: 'City Services', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Places Saved</span>
            <span className="text-sm font-semibold text-gray-900">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Cities Explored</span>
            <span className="text-sm font-semibold text-blue-600">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Routes Planned</span>
            <span className="text-sm font-semibold text-green-600">24</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">System Online</span>
        </div>
      </div>
    </div>
  );
};
