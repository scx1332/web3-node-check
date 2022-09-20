import configData from "./config.json";
import React, {useEffect, useState} from "react";
import MultiRpcProvider from "./MultiRpcProvider";


function CheckNode() {
    const [nodeUrl, setNodeUrl] = useState("http://localhost:8545/rpc/polygon/MAaCpE421MddDmzMLcAp");
    const [blockNumber, setBlockNumber] = useState(0);
    const [chainID, setChainID] = useState(0);
    const [processing, setProcessing] = useState(false);

    useEffect( () => {
        console.log("Setting block number to " + 20);
        return () => {
            //destructor
            console.log("Object destroyed");
        }
    }, []);

    useEffect( () => {
        console.log("Block number changed to: " + blockNumber);
    }, [blockNumber]);

    const checkNodeEvent = (val:string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
        setProcessing(true);
        try {
            let m = new MultiRpcProvider(nodeUrl);
            let chainIdPromise = m.getChainID();
            let blockNumberPromise = m.getBlockNumber();
            let chainId = await chainIdPromise;
            setChainID(chainId);
            let blockNumber = await blockNumberPromise;
            setBlockNumber(blockNumber);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <h3>Check node component</h3>
            <div>
                Node url: {nodeUrl}
            </div>
            <div>
                Chain ID: {chainID}
            </div>
            <div>
                Block number: {blockNumber}
            </div>
            <button disabled={processing} onClick={checkNodeEvent("argument")}>Check button 1</button>
        </div>
    );
}

export default CheckNode
