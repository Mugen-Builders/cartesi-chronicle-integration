// components/InfoSection.tsx
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="max-w-3xl text-center mb-12">
      <p className="text-xl mb-6">
        Integration of Cartesi Rollups with Chainlink Protocol's Oracle.
      </p>
      <h2 className="text-2xl font-semibold mb-4">What You're Testing:</h2>
      <div className="">
        <ul className="list-disc list-inside mb-4">
          <p>
            Chainlink Oracle (on Base Sepolia) → OracleCartesiReader Contract →
            InputBox Contract → Cartesi App
          </p>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Process:</h3>
        <ol className="list-decimal list-inside space-y-5">
          <li>Chainlink Oracle provides real-time pricefeeds on Base Sepolia</li>
          <li>OracleCartesiReader fetches and formats the Oracle data</li>
          <li>
            Data is sent to a Cartesi App through the InputBox contract
          </li>
          <li>
            Cartesi App processes the Oracle data and creates a notice.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default InfoSection;