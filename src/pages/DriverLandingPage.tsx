import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { 
  Truck, 
  Map, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar,
  MapPin,
  PackageCheck,
  Fuel,
  User,
  PhoneOutgoing
} from 'lucide-react';

const DriverLandingPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'today' | 'upcoming'>('today');
  const [deliveryStatus, setDeliveryStatus] = useState<{ [key: number]: string }>({
    1: 'En Route',
    2: 'Not Started',
    3: 'Not Started'
  });
  
  // Mock data for deliveries
  const todayDeliveries = [
    {
      id: 1,
      description: 'Concrete mix (10 tons)',
      destination: 'Highway 95 Expansion - North Sector',
      address: '2145 Construction Way, Springfield',
      time: '09:30 AM',
      estimatedDuration: '45 mins',
      priority: 'High'
    },
    {
      id: 2,
      description: 'Steel reinforcement bars',
      destination: 'Main Street Bridge Repair',
      address: '387 River Road, Springfield',
      time: '01:15 PM',
      estimatedDuration: '30 mins',
      priority: 'Medium'
    },
    {
      id: 3,
      description: 'Heavy equipment (Excavator)',
      destination: 'Downtown Intersection Upgrade',
      address: '901 Central Avenue, Springfield',
      time: '03:45 PM',
      estimatedDuration: '1 hr',
      priority: 'Medium'
    }
  ];
  
  const upcomingDeliveries = [
    {
      id: 4,
      description: 'Asphalt mix (15 tons)',
      destination: 'Highway 95 Expansion - South Sector',
      address: '2250 Construction Way, Springfield',
      date: 'Tomorrow',
      time: '08:00 AM',
      estimatedDuration: '50 mins',
      priority: 'High'
    },
    {
      id: 5,
      description: 'Precast concrete barriers',
      destination: 'Main Street Bridge Repair',
      address: '387 River Road, Springfield',
      date: 'Tomorrow',
      time: '11:30 AM',
      estimatedDuration: '45 mins',
      priority: 'Medium'
    }
  ];
  
  const vehicleInfo = {
    id: 'TRK-2023-105',
    type: 'Heavy Duty Flatbed',
    status: 'Operational',
    fuelLevel: 78,
    lastMaintenance: '2023-10-15',
    nextMaintenance: '2023-11-15',
    mileage: 12456
  };
  
  const contacts = [
    { id: 1, name: 'John Smith', role: 'Site Manager - Highway 95', phone: '(555) 123-4567' },
    { id: 2, name: 'Elena Martinez', role: 'Logistics Coordinator', phone: '(555) 987-6543' },
    { id: 3, name: 'David Wong', role: 'Site Manager - Bridge Repair', phone: '(555) 234-5678' }
  ];
  
  const updateDeliveryStatus = (id: number, status: string) => {
    setDeliveryStatus(prev => ({
      ...prev,
      [id]: status
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Driver Dashboard Header */}
      <div className="bg-primary-800 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden mb-8">
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Driver Dashboard</h1>
              <p className="text-primary-100 mt-1">Welcome back, Mike. You have 3 deliveries scheduled for today.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button 
                variant="outline" 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                icon={Calendar}
                size="sm"
              >
                My Schedule
              </Button>
              <Button 
                variant="accent" 
                icon={Map}
                size="sm"
                className="shadow-button-3d"
              >
                Navigation
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Today's Deliveries</h3>
              <p className="text-2xl font-bold">{todayDeliveries.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Completed</h3>
              <p className="text-2xl font-bold">
                {Object.values(deliveryStatus).filter(status => status === 'Completed').length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Vehicle Status</h3>
              <p className="text-xl font-bold text-success-400">{vehicleInfo.status}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white/80">Fuel Level</h3>
              <div className="flex items-center mt-1">
                <div className="w-full bg-white/20 rounded-full h-2.5 mr-2">
                  <div 
                    className={`h-full rounded-full ${vehicleInfo.fuelLevel > 25 ? 'bg-success-500' : 'bg-warning-500'}`}
                    style={{ width: `${vehicleInfo.fuelLevel}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold">{vehicleInfo.fuelLevel}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delivery Schedule */}
        <Card 
          title="Delivery Schedule" 
          icon={Truck}
          variant="default"
          className="lg:col-span-2"
        >
          <div className="mb-4 flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${activeView === 'today' ? 'bg-primary-500/20 text-primary-300' : 'bg-sky-950/30 text-sky-300/70 hover:text-sky-300'}`}
              onClick={() => setActiveView('today')}
            >
              Today
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${activeView === 'upcoming' ? 'bg-primary-500/20 text-primary-300' : 'bg-sky-950/30 text-sky-300/70 hover:text-sky-300'}`}
              onClick={() => setActiveView('upcoming')}
            >
              Upcoming
            </button>
          </div>
          
          <div className="space-y-4">
            {(activeView === 'today' ? todayDeliveries : upcomingDeliveries).map(delivery => (
              <div key={delivery.id} className="p-4 bg-sky-950/30 rounded-lg border border-sky-800/30">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-white text-lg">{delivery.description}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    delivery.priority === 'High' ? 'bg-danger-900/20 text-danger-400' :
                    delivery.priority === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                    'bg-sky-900/20 text-sky-400'
                  }`}>
                    {delivery.priority} Priority
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 mb-4">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-sky-300 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-sky-300/80">{delivery.destination}</p>
                      <p className="text-xs text-sky-300/60">{delivery.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-sky-300 mr-2" />
                    <div>
                      <p className="text-sm text-sky-300/80">
                        {activeView === 'today' ? delivery.time : `${(delivery as any).date}, ${delivery.time}`}
                      </p>
                      <p className="text-xs text-sky-300/60">Est. duration: {delivery.estimatedDuration}</p>
                    </div>
                  </div>
                </div>
                
                {activeView === 'today' && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        deliveryStatus[delivery.id] === 'Completed' ? 'bg-success-500' :
                        deliveryStatus[delivery.id] === 'En Route' ? 'bg-warning-500' :
                        'bg-sky-300/50'
                      }`}></div>
                      <span className="text-sm text-sky-300/80">
                        {deliveryStatus[delivery.id]}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {deliveryStatus[delivery.id] !== 'Completed' && (
                        <>
                          {deliveryStatus[delivery.id] === 'Not Started' && (
                            <Button 
                              variant="outline" 
                              size="xs" 
                              onClick={() => updateDeliveryStatus(delivery.id, 'En Route')}
                            >
                              Start Delivery
                            </Button>
                          )}
                          
                          {deliveryStatus[delivery.id] === 'En Route' && (
                            <Button 
                              variant="success" 
                              size="xs" 
                              icon={CheckCircle2}
                              onClick={() => updateDeliveryStatus(delivery.id, 'Completed')}
                            >
                              Mark Completed
                            </Button>
                          )}
                        </>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="xs" 
                        icon={Map}
                        className="text-primary-300 border-primary-500/30"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Vehicle Info & Contacts */}
        <div className="space-y-6">
          <Card title="Vehicle Information" icon={Truck} variant="default">
            <div className="bg-sky-950/30 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-2">{vehicleInfo.type}</h3>
              <p className="text-sm text-sky-300/80 mb-1">ID: {vehicleInfo.id}</p>
              <p className="text-sm text-sky-300/80 mb-1">Mileage: {vehicleInfo.mileage.toLocaleString()} km</p>
              
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-sky-300/80">Fuel Level</span>
                  <span className="text-white">{vehicleInfo.fuelLevel}%</span>
                </div>
                <div className="w-full bg-sky-950/70 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${vehicleInfo.fuelLevel > 25 ? 'bg-success-500' : 'bg-warning-500'}`}
                    style={{ width: `${vehicleInfo.fuelLevel}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-sky-950/50 p-2 rounded">
                  <p className="text-sky-300/80">Last Maintenance</p>
                  <p className="text-white">{vehicleInfo.lastMaintenance}</p>
                </div>
                <div className="bg-sky-950/50 p-2 rounded">
                  <p className="text-sky-300/80">Next Service</p>
                  <p className="text-white">{vehicleInfo.nextMaintenance}</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="xs" icon={Fuel}>
                  Log Refuel
                </Button>
                <Button variant="outline" size="xs" icon={AlertTriangle} className="text-warning-400 border-warning-500/30">
                  Report Issue
                </Button>
              </div>
            </div>
          </Card>
          
          <Card title="Delivery Map" icon={Map} variant="default">
            <div className="bg-sky-950/30 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-12 h-12 mx-auto text-sky-300/50 mb-3" />
                <p className="text-white">Interactive map would be displayed here</p>
                <p className="text-sm text-sky-300/70">Showing your delivery routes</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3" icon={Map}>
              Open Full Navigation
            </Button>
          </Card>
          
          <Card title="Site Contacts" icon={User} variant="default">
            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="p-3 bg-sky-950/30 rounded-lg">
                  <p className="font-medium text-white">{contact.name}</p>
                  <p className="text-xs text-sky-300/80 mb-2">{contact.role}</p>
                  <div className="flex items-center text-xs text-sky-300/80">
                    <PhoneOutgoing className="w-3 h-3 mr-1" />
                    <span>{contact.phone}</span>
                    <button className="ml-auto bg-primary-500/20 text-primary-300 p-1.5 rounded-lg hover:bg-primary-500/30">
                      <PhoneOutgoing className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Delivery Completion Stats */}
      <Card 
        title="Delivery Performance" 
        icon={PackageCheck}
        variant="default"
        className="mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-sky-950/30 p-4 rounded-lg">
              <h3 className="font-medium text-white mb-3">Weekly Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-950/50 p-3 rounded-lg text-center">
                  <p className="text-3xl font-bold text-white">18</p>
                  <p className="text-xs text-sky-300/80">Deliveries</p>
                </div>
                <div className="bg-sky-950/50 p-3 rounded-lg text-center">
                  <p className="text-3xl font-bold text-success-400">94%</p>
                  <p className="text-xs text-sky-300/80">On-time Rate</p>
                </div>
                <div className="bg-sky-950/50 p-3 rounded-lg text-center">
                  <p className="text-3xl font-bold text-white">352</p>
                  <p className="text-xs text-sky-300/80">KM Driven</p>
                </div>
                <div className="bg-sky-950/50 p-3 rounded-lg text-center">
                  <p className="text-3xl font-bold text-white">4.8</p>
                  <p className="text-xs text-sky-300/80">Rating</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-sky-950/30 p-4 rounded-lg h-full">
              <h3 className="font-medium text-white mb-3">Tasks</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-300/80">Today's Deliveries</span>
                  <span className="text-white font-medium">{todayDeliveries.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-300/80">Completed</span>
                  <span className="text-success-400 font-medium">
                    {Object.values(deliveryStatus).filter(status => status === 'Completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-300/80">Pending</span>
                  <span className="text-warning-400 font-medium">
                    {Object.values(deliveryStatus).filter(status => status !== 'Completed').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <div className="bg-sky-950/30 p-4 rounded-lg h-full">
              <h3 className="font-medium text-white mb-3">Next Steps</h3>
              <div className="space-y-3">
                {deliveryStatus[1] !== 'Completed' && (
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-warning-500 rounded-full mr-2"></div>
                    <span className="text-white">Complete Highway 95 delivery</span>
                  </div>
                )}
                {vehicleInfo.fuelLevel < 80 && (
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-warning-500 rounded-full mr-2"></div>
                    <span className="text-white">Refuel vehicle soon</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-sky-300 rounded-full mr-2"></div>
                  <span className="text-white">Check tomorrow's schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DriverLandingPage;
