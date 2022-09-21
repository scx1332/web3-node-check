import configData from "./config.json";
import React, {useEffect, useState} from "react";
import MultiRpcProvider from "./MultiRpcProvider";


function CheckNode(props: any) {
    const [nodeUrl, setNodeUrl] = useState(props.address);
    const [blockNumber, setBlockNumber] = useState(0);
    const [chainID, setChainID] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [lowestBad, setLowestBad] = useState(0);
    const [highestGood, setHighestGood] = useState(0);
    const [historyDepth, setHistoryDepth] = useState(0);

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

    const checkNodeHistory = async () => {
        let m = new MultiRpcProvider(nodeUrl);
        let blockNumber = await m.getBlockNumber();
        let highestGood = blockNumber;
        let lowestBad = 0;
        setHighestGood(highestGood);

        while (true) {
            let middle = Math.floor((highestGood + lowestBad) / 2);
            if (middle == lowestBad) {
                break;
            }
            try {
                let balance = await m.getBalance("0x0000000000000000000000000000000000001010", middle);
                console.log(balance);
                setHighestGood(middle);
                highestGood = middle;
            } catch (e) {
                setLowestBad(middle);
                lowestBad = middle;
            }
            //setLowestBad(lowestBad);
            //setHighestGood(highestGood);
            setHistoryDepth(blockNumber - highestGood);
        }
    }

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
            await checkNodeHistory();
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
            <div>
                History depth: {historyDepth}
            </div>
            <div>
                {blockNumber - lowestBad} - {blockNumber - highestGood}
            </div>
            <button disabled={processing} onClick={checkNodeEvent("argument")}>Check button 1</button>
        </div>
    );
}

export default CheckNode
