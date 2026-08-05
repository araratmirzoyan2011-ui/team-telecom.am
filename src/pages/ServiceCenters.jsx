import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const branchLocations = [
  {
    id: 1,
    address: "16 Gai Ave, Yerevan",
    hours: "From Monday till Sunday: 10:00 - 22:00",
    city: "Yerevan",
    district: "Nor Nork",
    lat: 40.1983,
    lng: 44.5661
  },
  {
    id: 2,
    address: "Avanesov str. 8/1-2, Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00",
    city: "Yerevan",
    district: "Erebuni",
    lat: 40.1481,
    lng: 44.5123
  },
  {
    id: 3,
    address: "5, Safaryan Str. Yerevan",
    hours: "From Monday till Friday: 09:00 - 19:00, Saturday: 09:00 - 18:00. Day off: Sunday.",
    lat: 40.1978,
    lng: 44.5684
  },
  {
    id: 4,
    address: "71, Tigran Mets Ave., territory 65-66, Yerevan",
    hours: "From Monday till Saturday: 09:00-18:00. Day off: Sunday.",
    lat: 40.1554,
    lng: 44.5148
  },
  {
    id: 5,
    address: "25/27, Tigran Mets Ave., Yerevan",
    hours: "From Monday till Friday: 09:00-20:00. Saturday: 09:00-18:00, Sunday: 10:00-19:00",
    lat: 40.1652,
    lng: 44.5101
  },
  {
    id: 6,
    address: "Khorenatsi 26, Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00, Days off: Saturday and Sunday.",
    lat: 40.1705,
    lng: 44.5133
  },
  {
    id: 7,
    address: "18, Bagratunyats str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 9:00 - 18:00, Sunday: 10:00-19:00",
    lat: 40.1472,
    lng: 44.4842
  },
  {
    id: 8,
    address: "50/3, Ohanov Str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00, Day offs: Saturday and Sunday.",
    lat: 40.1788,
    lng: 44.4536
  },
  {
    id: 9,
    address: "Airport Zvartnots",
    hours: "24/7",
    lat: 40.1473,
    lng: 44.3959
  },
  {
    id: 10,
    address: "24/1, Azatutyan Ave, Yerevan",
    hours: "From Monday till Friday: 9:00 - 19:00. Day-offs: Saturday and Sunday.",
    lat: 40.2075,
    lng: 44.5262
  },
  {
    id: 11,
    address: "3/7, Isakov Str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00. Day offs: Saturday and Sunday.",
    lat: 40.1668,
    lng: 44.4921
  },
  {
    id: 12,
    address: "26, Komitas ave, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 9:00 - 18:00, Sunday: 10:00-19:00",
    lat: 40.2014,
    lng: 44.5076
  },
  {
    id: 13,
    address: "56, Komitas Ave., Yerevan",
    hours: "From Monday till Friday: 9:00 - 19:00, Saturday: 9:00 - 18:00. Day-off: Sunday",
    lat: 40.2091,
    lng: 44.5218
  },
  {
    id: 14,
    address: "9/4, Qochinyan Str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00. Day offs: Saturday and Sunday.",
    lat: 40.1995,
    lng: 44.5702
  },
  {
    id: 15,
    address: "85/14, Artashisian Str., Yerevan",
    hours: "From Monday till Saturday: 9:00 - 18:00. Day off: Sunday.",
    lat: 40.1428,
    lng: 44.4789
  },
  {
    id: 16,
    address: "75/11, Andranik Str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 09:00-18:00 Sundays: 10:00 - 19:00.",
    lat: 40.1741,
    lng: 44.4445
  },
  {
    id: 17,
    address: "city Yerevan, str. Nubarashen 6 , 22/1",
    hours: "From Monday till Friday: 9:00 - 18:00, Days off: Saturday and Sunday. Break: 14:00-15:00",
    lat: 40.1341,
    lng: 44.5492
  },
  {
    id: 18,
    address: "Mikoyan 15/3, c. Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00, day offs: Saturday and Sunday",
    lat: 40.2198,
    lng: 44.5489
  },
  {
    id: 19,
    address: "18/5 Erebuni, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday 9:00-18:00 and Sunday 10:00-19:00",
    lat: 40.1506,
    lng: 44.5129
  },
  {
    id: 20,
    address: "1b/1, Isahakyan district, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 9:00 - 18:00. Day-off: Sunday",
    lat: 40.1918,
    lng: 44.5583
  },
  {
    id: 21,
    address: "P. Sevak str. 51 Yerevan",
    hours: "From Monday till Friday: 09:00 - 20:00, Saturday: 09:00 - 18:00 , Sunday: 10:00 - 19:00",
    lat: 40.2036,
    lng: 44.5312
  },
  {
    id: 22,
    address: "Amiryan str. 3, c. Yerevan",
    hours: "From Monday till Sunday: 09:00 - 24:00.",
    lat: 40.1783,
    lng: 44.5109
  },
  {
    id: 23,
    address: "4, Northern Ave. Yerevan",
    hours: "From Monday till Sunday: 09:00 - 24:00.",
    lat: 40.1822,
    lng: 44.5142
  },
  {
    id: 24,
    address: "Soghomon Taronts str. 11/5, c. Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00, Days off: Saturday and Sunday",
    lat: 40.1512,
    lng: 44.4908
  },
  {
    id: 25,
    address: "Sarkavagi str. 129/6, c. Yerevan",
    hours: "From Monday till Friday: 9:00 - 18:00, Days off: Saturday and Sunday.",
    lat: 40.2224,
    lng: 44.5401
  },
  {
    id: 26,
    address: "Bashinjaghyan 191/3, c. Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 9:00 - 18:00. Sunday: 10:00 - 19:00",
    lat: 40.1979,
    lng: 44.4691
  },
  {
    id: 27,
    address: "25/1, 3, Davtashen Str, Yerevan",
    hours: "From Monday till Friday: 9:00 - 20:00, Saturday: 9:00 - 18:00. Sunday: 10:00-19:00",
    lat: 40.2115,
    lng: 44.4849
  }
];

function ChangeMapView({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 15);
  }
  return null;
}

export default function BranchesMap() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branchLocations.filter(b => 
    b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <h1 className='text-[48px] ml-[15%] mt-[200px]'>Sales and service centers</h1>
      <div className="flex flex-col md:flex-row h-[800px] w-full font-sans mt-[40px]">
        
        <div className="flex-1 h-full w-full">
          <MapContainer 
            center={[40.1792, 44.4991]} 
            zoom={12} 
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {selectedBranch && <ChangeMapView coords={[selectedBranch.lat, selectedBranch.lng]} />}

            {filteredBranches.map((branch) => (
              <Marker 
                key={branch.id} 
                position={[branch.lat, branch.lng]}
                eventHandlers={{
                  click: () => setSelectedBranch(branch)
                }}
              >
                <Popup>
                  <strong className="font-semibold text-gray-900">{branch.address}</strong>
                  <br />
                  <span className="text-gray-600">{branch.hours}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* ԱՋ ԿՈՂՄ՝ ՖԻԼՏՐՆԵՐ ԵՎ ՑԱՆԿ */}
        <div className="w-full md:w-[350px] p-4 overflow-y-auto bg-gray-50 border-l border-gray-300">
          
          {/* Որոնման դաշտ */}
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          />

          {/* Մասնաճյուղերի ցանկ */}
          <div className="space-y-2.5">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranch?.id === branch.id;
              return (
                <div 
                  key={branch.id} 
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                    isSelected 
                      ? 'bg-sky-100 border-sky-300' 
                      : 'bg-white border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <h4 className="m-0 text-sm font-semibold text-gray-800">
                    📍 {branch.address}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {branch.hours}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}