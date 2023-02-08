const { Alchemy, Network } = require("alchemy-sdk");
const mysql = require("mysql2");
const { AlchemyProvider } = require("@ethersproject/providers");

const { getAddress } = require("./account_create");

// The 100 addresses that you want to check against
const addresses = getAddress();
const config = {
  apiKey: "LI5Jac5S56Yek1xbJSsicRhKAWtmzKB8",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);
const provider = new AlchemyProvider(
  "goerli",
  "LI5Jac5S56Yek1xbJSsicRhKAWtmzKB8"
);

// Function to insert a transaction into the database table
const insertTransaction = (transaction) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "your_user",
    password: "your_password",
    database: "your_database",
  });

  connection.connect();

  const sql =
    "INSERT INTO transactions (BlockNum,Transaction_Hash,FromAddress,ToAddress,Amount) VALUES (?, ?, ?, ?, ?)";
  const params = [parseInt(transaction.blockNum,16),transaction.hash,transaction.from, transaction.to, transaction.value];

  connection.query(sql, params, function (error, results, fields) {
    if (error) {
      console.error(error);
    } else {
      console.log(`Transaction inserted: ${transaction.hash}`);
    }
    connection.end();
  });
};

// Function to get the latest block and its transactions
const getLatestBlock = async () => {
  const blockNumber = await provider.getBlockNumber();
  console.log(blockNumber);
  for (let add in addresses) {
    const data1 = await alchemy.core.getAssetTransfers({
      fromBlock: blockNumber - 1,
      fromAddress:
        /*addresses[add]*/ "0x84Ebf92fA78e90832a52F1b8b7c1eb35487c091B",
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    const data2 = await alchemy.core.getAssetTransfers({
      fromBlock: blockNumber - 1,
      toAddress:
        addresses[add],
      category: ["external", "internal", "erc20", "erc721", "erc1155"],
    });
    // console.log(add,data1);
    if(data1.transfers!=''){
    insertTransaction(data1);}
    // console.log(add,data2);
    if(data2.transfers!=''){
    insertTransaction(data2);}
  }
}
setInterval(getLatestBlock, 10000);
