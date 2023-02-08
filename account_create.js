const ethers = require("ethers");
const { AlchemyProvider } = require("@ethersproject/providers");
const provider = new AlchemyProvider(
  "goerli",
  "LI5Jac5S56Yek1xbJSsicRhKAWtmzKB8"
);

// Generate 100 new addresses from the wallet
const addresses = [];
const getAddress = () => {
  const wallet = ethers.Wallet.createRandom(provider);
  console.log("Private Key:", wallet.privateKey);
  for (let i = 0; i < 100; i++) {
    addresses.push(wallet.derivePath(`m/44'/60'/0'/0/${i}`).address);
  }
  return addresses;
};
// console.log("Addresses:", getAddress());
module.exports={getAddress};
