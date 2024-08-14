import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Loader2 } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";
import { useWriteInputBox } from "./hooks/generated";
import { OracleCartesiReaderABi } from "./lib/oracleAbi";
import { Address, Hex, stringToHex } from "viem";
import { fetchGraphQLData } from "./utils/api";
import { NOTICES_QUERY } from "./utils/queries";

const DataFetchSection: React.FC = () => {
  const [dappAddress, setDappAddress] = useState("");
  const [oracleContract, setOracleContract] = useState("");
  const [tableData, setTableData] = useState<Array<{ price: string; timestamp: string }>>([]);

  const { chain } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { writeContractAsync: writeInputBox, isPending } = useWriteInputBox();

  const generateMockData = () => ({
    ethUsdPrice: (Math.random() * 2000 + 1000).toFixed(2),
    timestamp: Math.floor(Date.now() / 1000),
  });

  const hexToJson = (hex: string) => {
    const str = Buffer.from(hex.slice(2), 'hex').toString('utf8');
    return JSON.parse(str);
  };

  const handleFetchData = async () => {
    try {
      const mockData = generateMockData();
      let endpoint = '';

      if (chain?.id === 31337) { // Anvil chain ID
        endpoint = 'http://localhost:8080/graphql';
        await writeInputBox({
          functionName: "addInput",
          args: [dappAddress as Address, stringToHex(JSON.stringify(mockData)) as Hex],
        });
      } else if (chain?.id === 11155111) { // Sepolia chain ID
        endpoint = 'https://cartesi-chronicle-test.fly.dev/graphql';
        await writeContractAsync({
          abi: OracleCartesiReaderABi,
          address: oracleContract as Address,
          functionName: "relayPrice",
          args: [dappAddress],
        });
      } else {
        console.error("Unsupported chain");
        return;
      }
      
      const data = await fetchGraphQLData<{ notices: { edges: { node: { payload: string } }[] } }>(
        endpoint,
        NOTICES_QUERY
      );

      // Decode the payload and update the table data
      const decodedData = data.notices.edges.map(edge => hexToJson(edge.node.payload));

      setTableData(
        decodedData.map(decoded => ({
          price: decoded.ethUsdPrice,
          timestamp: new Date(decoded.timestamp * 1000).toLocaleString(), // Assuming the timestamp is in seconds
        }))
      );

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mb-8">
        <Input
          type="text"
          placeholder="Enter dApp address"
          value={dappAddress}
          onChange={(e) => setDappAddress(e.target.value)}
          className="mb-4"
        />
        <Input
          type="text"
          placeholder="Enter OracleCartesiReader contract address"
          value={oracleContract}
          onChange={(e) => setOracleContract(e.target.value)}
          className="mb-4"
        />
        <Button
          onClick={handleFetchData}
          className="w-full bg-gray-800 text-white hover:bg-gray-700"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Fetch Data"
          )}
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ETH/USD Price</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>${data.price}</TableCell>
                <TableCell>{data.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DataFetchSection;