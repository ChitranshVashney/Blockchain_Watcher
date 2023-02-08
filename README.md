# Blockchain_Watcher
A Node.js script that uses the Alchemy SDK and Ethers.js to track and store Ethereum transactions for a list of addresses. The transactions are stored in a MySQL database.

## Prerequisites
- Node.js and npm installed on your system
- An Alchemy API key
- A MySQL database setup with the following table:
```sql
CREATE TABLE transactions (
  BlockNum INT,
  Transaction_Hash VARCHAR(66) PRIMARY KEY,
  FromAddress VARCHAR(42),
  ToAddress VARCHAR(42),
  Amount INT
);
```
## Setup
1. Clone the repository and navigate to the project folder.
2. Run npm install to install the required dependencies.
3. Replace "your_user", "your_password", and "your_database" in the code with the corresponding information for your MySQL database.
4. Replace "LI5Jac5S56Yek1xbJSsicRhKAWtmzKB8" with your Alchemy API key.
5. Replace addresses[add] with the list of addresses you want to track.
## Running the Script
1. Run the script using the command node index.js
2. The transactions will be inserted into the MySQL database every 10 seconds.
## Notes
1. This script is set up to track the Goerli Ethereum test network. To track the main Ethereum network, change Network.ETH_GOERLI to Network.ETH_MAINNET in the code.
2. The function getAddress() is used to get the list of addresses, which create addresses from account_create.js script.
