import configData from "./config.json";
import React, {useEffect, useState} from "react";
import MultiRpcProvider from "./MultiRpcProvider";


function CheckNode() {
    const [nodeUrl, setNodeUrl] = useState("https://bor.golem.network");
    const [blockNumber, setBlockNumber] = useState(0);
    const [chainID, setChainID] = useState(0);

    useEffect( () => {
        //constructor
        return () => {
            //destructor
        }
    }, []);



    const checkNodeEvent = (val:string) => (event: React.MouseEvent<HTMLButtonElement>) => {
        let m = new MultiRpcProvider(nodeUrl);
        m.getChainID().then((chainId) => {setChainID(chainId)});
        m.getBlockNumber().then((blockNumber) => {setBlockNumber(blockNumber)});
        event.preventDefault();
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
            <button onClick={checkNodeEvent("t")}>Check endpoint</button>
        </div>
    );

}

export default CheckNode
