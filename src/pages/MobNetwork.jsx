import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { header as Header } from '../Components/header.jsx';
import Footer from '../Components/footer.jsx';
function CustomZoomControl() {
  const map = useMap();
  return (
    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-1.5 shadow-xl rounded-2xl overflow-hidden backdrop-blur-md bg-white/80 border border-white/40 p-1">
      <button 
        onClick={() => map.zoomIn()}
        className="w-10 h-10 flex items-center justify-center font-semibold text-gray-700 hover:bg-white hover:text-black rounded-xl transition-all active:scale-95 text-lg"
      >
        +
      </button>
      <div className="w-6 h-[1px] bg-gray-200/60 mx-auto"></div>
      <button 
        onClick={() => map.zoomOut()}
        className="w-10 h-10 flex items-center justify-center font-semibold text-gray-700 hover:bg-white hover:text-black rounded-xl transition-all active:scale-95 text-lg"
      >
        −
      </button>
    </div>
  );
}

export default function CoverageMap({ coverageData = {} }) {
  const [activeTab, setActiveTab] = useState('4G');
  const [searchQuery, setSearchQuery] = useState('');

  const getFeatureStyle = (feature) => {
    switch (feature?.properties?.coverage) {
      case 'excellent':
        return { fillColor: '#e63946', fillOpacity: 0.5, color: '#d62828', weight: 0.5 };
      case 'well':
        return { fillColor: '#ffb703', fillOpacity: 0.45, color: '#fb8500', weight: 0.5 };
      case 'weak':
        return { fillColor: '#8ecae6', fillOpacity: 0.35, color: '#219ebc', weight: 0.5 };
      default:
        return { fillColor: 'transparent', weight: 0 };
    }
  };

  const currentGeoJson = coverageData[activeTab];

  return (
    <>
    <Header />

    <h1 className='text-[48px] ml-[15%] mt-[200px]'>Mobile network coverage areas</h1>
    <div className="relative w-full h-screen font-sans antialiased text-gray-800 overflow-hidden bg-slate-100 mt-[40px]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .leaflet-container { font-family: 'Plus Jakarta Sans', sans-serif; background: #e5e7eb; }
      `}</style>

      <div className="absolute top-6 left-6 z-[1000] flex items-center shadow-xl rounded-full p-1.5 backdrop-blur-md bg-white/85 border border-white/50 w-80 transition-all hover:bg-white/95">
        <div className="pl-4 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Որոնել հասցե..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 w-full bg-transparent outline-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
        />
        <button className="bg-amber-400 hover:bg-amber-500 active:scale-95 text-gray-900 px-5 py-2 rounded-full font-semibold text-xs transition-all shadow-sm">
          Գտնել
        </button>
      </div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] backdrop-blur-md bg-white/80 p-1.5 rounded-full shadow-xl border border-white/50 flex gap-1">
        {['5G', '4G', '3G'].map((tech) => {
          const isActive = activeTab === tech;
          return (
            <button
              key={tech}
              onClick={() => setActiveTab(tech)}
              className={`relative px-7 py-2 rounded-full font-bold text-xs transition-all duration-300 ${
                isActive
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <div className="absolute top-6 right-6 z-[1000] backdrop-blur-md bg-white/85 p-4 rounded-3xl shadow-xl border border-white/50 w-56 flex flex-col gap-2.5">
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase px-1">
          Ծածկույթի մակարդակ
        </span>
        <div className="flex flex-col gap-2">
          {[
            { color: '#e63946', label: 'Գերազանց' },
            { color: '#ffb703', label: 'Լավ' },
            { color: '#8ecae6', label: 'Թույլ' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 px-1 py-0.5">
              <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white/80 shadow-sm" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer 
        center={[40.1792, 44.4991]} 
        zoom={9} 
        className="w-full h-full"
        zoomControl={false}
      >
        {/* Base Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />

        {currentGeoJson && (
          <GeoJSON
            key={activeTab}
            data={currentGeoJson}
            style={getFeatureStyle}
          />
        )}

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
          pane="shadowPane"
        />

        <CustomZoomControl />
      </MapContainer>
    </div>
    <Footer />
    </>
  );
}