// components/LandingPage.tsx
import React from 'react';
import InfoSection from './InfoSection';
import DataFetchSection from './DataFetchingSection';

interface LandingPageProps {
  isConnected: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isConnected }) => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-8">
      <InfoSection />
      {isConnected && <DataFetchSection />}
    </main>
  );
};

export default LandingPage;