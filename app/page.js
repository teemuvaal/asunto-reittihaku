'use client'

import { useState } from 'react';
import TravelForm from './components/TravelForm';
import TravelResults from './components/TravelResults';
import { getTravelInfo } from './actions';
import Footer from './components/Footer';

export default function Home() {
  const [travelInfo, setTravelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (apartment, destinations) => {
    setIsLoading(true);
    const results = await getTravelInfo(apartment, destinations);
    setTravelInfo(results);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 flex-col">
      <div className="w-full max-w-4xl">
        <TravelForm onSubmit={handleSubmit} />
        {isLoading ? (
          <p className="mt-4 text-center">Haetaan matkatietoja...</p>
        ) : (
          <TravelResults travelInfo={travelInfo} />
        )}
      </div>
      <Footer />
    </div>
  );
}
