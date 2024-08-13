// components/Header.tsx
import React from 'react';
import { Button } from "./components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

const Header: React.FC = () => {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        Cartesi Rollups + Chronicle Protocol
      </div>
      <div>
        {isConnected ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                {chain?.name || "Unknown"} - {shortenAddress(address || "")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              {chains.map((c) => (
                <Button
                  key={c.id}
                  onClick={() => switchChain({ chainId: c.id })}
                  className="w-full justify-start text-white bg-gray-800 hover:bg-gray-700 mb-2"
                >
                  Switch to {c.name}
                </Button>
              ))}
              <Button
                onClick={() => disconnect()}
                className="w-full justify-start text-white bg-gray-800 hover:bg-gray-700"
              >
                Disconnect
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            onClick={() => connect({ connector: connectors[0] })}
            className="bg-gray-800 text-white hover:bg-gray-700"
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;