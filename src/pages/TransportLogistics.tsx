import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Truck, Map, Calendar, AlertCircle } from 'lucide-react';

const TransportLogistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fleet');

  // Mock fleet data
  const vehicles = [
    { id: 1, name: 'Dump Truck #103', type: 'Dump Truck', status: 'Active', driver: 'John Doe', location: 'Highway 95 Site' },
    { id: 2, name: 'Cement Mixer #87', type: 'Cement Mixer', status: 'Maintenance', driver: 'Sarah Smith', location: 'Central Depot' },
    { id: 3, name: 'Excavator #42', type: 'Heavy Equipment', status: 'Active', driver: 'Mike Johnson', location: 'Main Street Bridge' },
    { id: 4, name: 'Bulldozer #65', type: 'Heavy Equipment', status: 'Idle', driver: 'Unassigned', location: 'South Depot' }
  ];

  // Mock deliveries data
  const deliveries = [
    { id: 1, material: 'Concrete Mix', quantity: '15 tons', status: 'In Transit', origin: 'Central Depot', destination: 'Highway 95 Site', eta: '2:30 PM' },
    { id: 2, material: 'Steel Beams', quantity: '8 units', status: 'Scheduled', origin: 'Steel Works Inc.', destination: 'Main Street Bridge', eta: '10:15 AM (Tomorrow)' },
    { id: 3, material: 'Gravel', quantity: '20 tons', status: 'Delivered', origin: 'Quarry Site', destination: 'Downtown Intersection', eta: 'Completed' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Transport & Logistics</h1>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="primary" size="sm">
            <Truck className="w-4 h-4 mr-2" />
            New Delivery
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-sky-800/30 mb-4">
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'fleet' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('fleet')}
          >
            <Truck className="w-4 h-4 mr-2" />
            Fleet Management
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'tracking' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('tracking')}
          >
            <Map className="w-4 h-4 mr-2" />
            Delivery Tracking
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'issues' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('issues')}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Issues
          </button>
        </div>

        {activeTab === 'fleet' && (
          <Card title="Fleet Management" variant="default">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{vehicle.name}</h3>
                      <p className="text-sm text-sky-300/80">{vehicle.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      vehicle.status === 'Active' ? 'bg-green-900/50 text-green-300' :
                      vehicle.status === 'Maintenance' ? 'bg-orange-900/50 text-orange-300' :
                      'bg-gray-900/50 text-gray-300'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between py-1 border-b border-sky-800/20">
                      <span className="text-sky-300/60">Driver:</span>
                      <span className="text-white">{vehicle.driver}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sky-300/60">Location:</span>
                      <span className="text-white">{vehicle.location}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="xs">Details</Button>
                    <Button variant="outline" size="xs">Assign</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'tracking' && (
          <Card title="Delivery Tracking" variant="default">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                  <tr>
                    <th className="px-6 py-3">Material</th>
                    <th className="px-6 py-3">Quantity</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Origin</th>
                    <th className="px-6 py-3">Destination</th>
                    <th className="px-6 py-3">ETA</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map(delivery => (
                    <tr key={delivery.id} className="border-b border-sky-800/30">
                      <td className="px-6 py-4 font-medium text-white">{delivery.material}</td>
                      <td className="px-6 py-4">{delivery.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          delivery.status === 'In Transit' ? 'bg-blue-900/50 text-blue-300' :
                          delivery.status === 'Scheduled' ? 'bg-purple-900/50 text-purple-300' :
                          'bg-green-900/50 text-green-300'
                        }`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{delivery.origin}</td>
                      <td className="px-6 py-4">{delivery.destination}</td>
                      <td className="px-6 py-4">{delivery.eta}</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="xs">Track</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 border border-sky-800/30 rounded-lg">
              <h3 className="font-medium text-white mb-3">Delivery Map</h3>
              <div className="bg-sky-950/50 rounded-lg h-64 flex items-center justify-center text-sky-300/50">
                Interactive delivery tracking map will be implemented here
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'issues' && (
          <Card title="Logistics Issues" variant="default">
            <div className="space-y-4">
              <div className="p-4 border border-red-800/30 rounded-lg bg-red-950/20">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Cement Mixer #87 Requires Urgent Maintenance</h3>
                    <p className="text-sm text-sky-300/80 mb-2">Hydraulic system failure reported. Vehicle is at Central Depot.</p>
                    <div className="flex items-center text-xs text-sky-300/60">
                      <span>Reported by: Sarah Smith</span>
                      <span className="mx-2">•</span>
                      <span>2 hours ago</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="danger" size="xs">Mark Urgent</Button>
                      <Button variant="outline" size="xs">Assign Repair</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-yellow-800/30 rounded-lg bg-yellow-950/20">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white mb-1">Gravel Delivery Delayed</h3>
                    <p className="text-sm text-sky-300/80 mb-2">Expected delay of 2 hours due to traffic congestion on Highway 12.</p>
                    <div className="flex items-center text-xs text-sky-300/60">
                      <span>Reported by: System</span>
                      <span className="mx-2">•</span>
                      <span>30 minutes ago</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="warning" size="xs">Notify Project Manager</Button>
                      <Button variant="outline" size="xs">Update ETA</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransportLogistics;
