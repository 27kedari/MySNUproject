import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  MapPin, 
  Clock, 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  Car,
  Briefcase,
  Shield,
  Zap,
  Droplets,
  PiggyBank,
  Gavel,
  FileText,
  Wifi,
  Globe,
  Heart,
  Home,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CityServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState('emergency');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  const emergencyServices = [
    {
      name: 'Police Emergency',
      number: '100',
      icon: Shield,
      color: 'text-blue-600',
      available: '24/7',
      description: 'Report crimes, accidents, and emergencies'
    },
    {
      name: 'Fire Emergency',
      number: '101',
      icon: Zap,
      color: 'text-red-600',
      available: '24/7',
      description: 'Fire incidents and rescue operations'
    },
    {
      name: 'Medical Emergency',
      number: '108',
      icon: Stethoscope,
      color: 'text-green-600',
      available: '24/7',
      description: 'Ambulance and medical emergencies'
    },
    {
      name: 'Disaster Management',
      number: '1070',
      icon: Shield,
      color: 'text-orange-600',
      available: '24/7',
      description: 'Natural disasters and relief operations'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      icon: Heart,
      color: 'text-pink-600',
      available: '24/7',
      description: 'Women safety and support services'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      icon: Users,
      color: 'text-purple-600',
      available: '24/7',
      description: 'Child protection and welfare services'
    }
  ];

  const publicServices = [
    {
      name: 'Municipal Corporation',
      category: 'Government',
      icon: Building2,
      services: ['Birth Certificate', 'Property Tax', 'Water Connection', 'Building Permits', 'Trade License', 'Death Certificate'],
      onlineUrl: 'https://webland.ap.gov.in',
      details: {
        address: 'Municipal Corporation Office, City Center',
        phone: '040-23456789',
        hours: '9:00 AM - 5:00 PM',
        documents: ['Aadhar Card', 'Residence Proof', 'Application Form'],
        fees: 'Varies by service (₹50 - ₹500)'
      }
    },
    {
      name: 'Transport Department',
      category: 'Transport',
      icon: Car,
      services: ['Driving License', 'Vehicle Registration', 'Fitness Certificate', 'Route Permits', 'Pollution Certificate', 'Insurance Verification'],
      onlineUrl: 'https://transport.ap.gov.in',
      details: {
        address: 'RTO Office, Transport Bhavan',
        phone: '040-23567890',
        hours: '10:00 AM - 4:00 PM',
        documents: ['Aadhar Card', 'Address Proof', 'Medical Certificate'],
        fees: 'DL: ₹200, Registration: ₹500-2000'
      }
    },
    {
      name: 'Electricity Board',
      category: 'Utilities',
      icon: Zap,
      services: ['New Connection', 'Bill Payment', 'Meter Reading', 'Fault Reporting', 'Load Enhancement', 'Tariff Information'],
      onlineUrl: 'https://aptransco.gov.in',
      details: {
        address: 'APSEB Office, Power House Road',
        phone: '040-23678901',
        hours: '9:00 AM - 5:00 PM',
        documents: ['ID Proof', 'Address Proof', 'Ownership Documents'],
        fees: 'Connection: ₹1000-5000 (varies by load)'
      }
    },
    {
      name: 'Water Department',
      category: 'Utilities',
      icon: Droplets,
      services: ['New Connection', 'Bill Payment', 'Quality Testing', 'Pipeline Issues', 'Meter Installation', 'Leakage Complaints'],
      onlineUrl: 'https://hmwssb.gov.in',
      details: {
        address: 'Water Works Department, Municipal Building',
        phone: '040-23789012',
        hours: '9:00 AM - 5:00 PM',
        documents: ['Property Documents', 'ID Proof', 'NOC from Society'],
        fees: 'Connection: ₹2000-8000'
      }
    },
    {
      name: 'Revenue Department',
      category: 'Land Records',
      icon: FileText,
      services: ['Land Records', 'Survey Settlement', 'Pahani Copy', 'Mutation', 'Revenue Court', 'Survey Numbers'],
      onlineUrl: 'https://webland.ap.gov.in',
      details: {
        address: 'Tehsildar Office, Collectorate',
        phone: '040-23890123',
        hours: '10:00 AM - 4:00 PM',
        documents: ['Land Documents', 'ID Proof', 'Survey Records'],
        fees: 'Certificates: ₹20-100'
      }
    },
    {
      name: 'Banking Services',
      category: 'Financial',
      icon: PiggyBank,
      services: ['Account Opening', 'Loan Applications', 'KYC Updates', 'Digital Banking', 'Insurance Claims', 'Investment Services'],
      onlineUrl: 'https://onlinesbi.com',
      details: {
        address: 'Various Bank Branches',
        phone: 'Branch Specific',
        hours: '10:00 AM - 4:00 PM',
        documents: ['PAN Card', 'Aadhar Card', 'Income Proof'],
        fees: 'Account: Free to ₹500'
      }
    },
    {
      name: 'Legal Services',
      category: 'Judiciary',
      icon: Gavel,
      services: ['Court Cases', 'Legal Aid', 'Notary Services', 'Document Verification', 'Marriage Registration', 'Affidavits'],
      onlineUrl: 'https://districts.ecourts.gov.in',
      details: {
        address: 'District Court Complex',
        phone: '040-24012345',
        hours: '10:30 AM - 4:30 PM',
        documents: ['Case specific documents', 'ID Proof'],
        fees: 'Court fees vary by case type'
      }
    },
    {
      name: 'Education Department',
      category: 'Education',
      icon: GraduationCap,
      services: ['School Admissions', 'Scholarships', 'Transfer Certificate', 'Equivalency Certificate', 'Mid-Day Meal', 'Teacher Training'],
      onlineUrl: 'https://school.ap.gov.in',
      details: {
        address: 'DEO Office, Education Department',
        phone: '040-24123456',
        hours: '9:30 AM - 5:30 PM',
        documents: ['Birth Certificate', 'Previous School Records', 'Caste Certificate'],
        fees: 'Most services free, some certificates ₹10-50'
      }
    }
  ];

  const digitalServices = [
    {
      name: 'AP Land Records (Webland)',
      description: 'Online land records, pahani, and property verification services',
      url: 'https://webland.ap.gov.in',
      icon: MapPin,
      features: ['Land Records', 'Survey Numbers', 'Pahani Details', 'Land Classification']
    },
    {
      name: 'AP Online Services',
      description: 'Comprehensive government services and certificate applications',
      url: 'https://aponline.gov.in',
      icon: Briefcase,
      features: ['Certificates', 'License Applications', 'Bill Payments', 'Registrations']
    },
    {
      name: 'e-Seva Centers',
      description: 'One-stop shop for all government services and applications',
      url: 'https://eseva.ap.gov.in',
      icon: Users,
      features: ['Document Services', 'Online Applications', 'Payment Gateway', 'Status Tracking']
    },
    {
      name: 'Digital Banking',
      description: 'Online banking, UPI payments, and financial services',
      url: 'https://onlinesbi.com',
      icon: PiggyBank,
      features: ['Fund Transfer', 'Bill Payments', 'Account Management', 'Loan Services']
    },
    {
      name: 'e-Governance Portal',
      description: 'Digital governance services and citizen engagement platform',
      url: 'https://ap.gov.in',
      icon: Globe,
      features: ['Citizen Services', 'Grievance Redressal', 'Policy Information', 'Feedback System']
    },
    {
      name: 'Wi-Fi Hotspots',
      description: 'Free public Wi-Fi services across the city',
      url: 'https://digitalindia.gov.in',
      icon: Wifi,
      features: ['Public Areas', 'Government Buildings', 'Parks', 'Transport Hubs']
    }
  ];

  const tabs = [
    { id: 'emergency', label: 'Emergency Services', icon: Phone },
    { id: 'public', label: 'Public Services', icon: Building2 },
    { id: 'digital', label: 'Digital Services', icon: Globe }
  ];

  const handleViewDetails = (service: any) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const handleApplyOnline = (service: any) => {
    if (service.onlineUrl) {
      window.open(service.onlineUrl, '_blank');
    }
  };

  const handleAccessService = (service: any) => {
    window.open(service.url, '_blank');
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">City Services</h1>
          <p className="text-gray-600">Access essential services, emergency contacts, and digital platforms for your city</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Emergency</h3>
                <p className="text-red-100">Call 100, 101, 108</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Government</h3>
                <p className="text-blue-100">Certificates & Licenses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold">Digital</h3>
                <p className="text-green-100">Online Services</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'emergency' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${service.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.available}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => window.open(`tel:${service.number}`)}
                  >
                    Call {service.number}
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'public' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publicServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.category}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-900">Available Services:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.services.map((item) => (
                        <div key={item} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => handleViewDetails(service)}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => handleApplyOnline(service)}
                    >
                      Apply Online
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleAccessService(service)}
                  >
                    Access Service
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {/* Service Details Modal */}
        {showServiceDetails && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedService.name}</h2>
                  <button
                    onClick={() => setShowServiceDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <p className="text-gray-600">📍 {selectedService.details.address}</p>
                    <p className="text-gray-600">📞 {selectedService.details.phone}</p>
                    <p className="text-gray-600">🕐 {selectedService.details.hours}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Required Documents</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {selectedService.details.documents.map((doc: string) => (
                        <li key={doc}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fees</h3>
                    <p className="text-gray-600">{selectedService.details.fees}</p>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <Button 
                      onClick={() => handleApplyOnline(selectedService)}
                      className="flex-1"
                    >
                      Apply Online
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowServiceDetails(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Additional Help?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you can't find the service you're looking for, our support team is here to help you navigate government services and connect you with the right department.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Contact Support</span>
              </Button>
              <Button className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Find Nearest Office</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Download Forms</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
