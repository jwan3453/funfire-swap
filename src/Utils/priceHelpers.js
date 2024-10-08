const axios = require("axios");

const ETHERSCAN_API_KEY = "TVRYGGPER7J9VNSY2AAX2RMT869ZGCIJF2";

exports.getAbi = async (address) => {
  // const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);
  return abi;
};

exports.getTokenHoldingList = async(address) => {
  const url = `https://api.etherscan.io/api?module=account&action=addresstokenbalance&address=${address}&page=1&offset=100&apikey=${ETHERSCAN_API_KEY}`
  const res = await axios.get(url);
  console.log();
  const result = JSON.parse(res.data.result);
  return result;
}

exports.getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
 
  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee,
  };

  return immutables;
};
