interface CallData {
    method: string;
    params: any[];
}


class MultiRpcProvider {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async singleCall(callData: CallData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": callData["method"],
                "params": callData["params"],
                "id": 1
            })
        };
        let response = await fetch(this.url, requestOptions)
        let data = await response.json()
        return data;
    }

    async getBalance(address:string, blockNumber:number) : Promise<BigInt> {
        let data = await this.singleCall({
            method: "eth_getBalance",
            params: [address, "0x" + blockNumber.toString(16)]
        })
        console.log(data);
        return BigInt(data.result);
    }

    async getBlockNumber() {
        //const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        //await sleep(4000);
        let data = await this.singleCall({
            method: "eth_blockNumber",
            params: []
        })
        return parseInt(data.result, 16);
    }

    async getChainID() {
        let data = await this.singleCall({
            method: "eth_chainId",
            params: []
        })
        return parseInt(data.result, 16);
    }

}
export default MultiRpcProvider;
