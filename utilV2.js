import TronWeb from 'tron-api';
import jsonfile from 'jsonfile';
// 配置TRON网络信息
const fullNode = 'https://api.trongrid.io'; // TRON全节点地址
const solidityNode = 'https://api.trongrid.io'; // TRON Solidity节点地址
const eventServer = 'https://api.trongrid.io'; // TRON事件服务器地址
const privateKey = '8b178dc4a8655bed0d87d692e8047d9c31db803699633df97acc4ce844b3b68b'; // 您的TRON秘钥

const YOUR_TRON_ADDRESS = 'TPEmvqjffLJfi2R4dsxQ2gVBt5XBFMpMqo';// 您的TRON地址
//获取账户余额
const tronWeb = new TronWeb({
        "fullNode": fullNode,
        "solidityNode": solidityNode,
        "eventServer": eventServer,
        "privateKey": privateKey
    }
);

// 获取账户余额
function getBalance(address) {
    let balance = 0;
    // 获取余额
    tronWeb.trx.getBalance(address).then(balance => {
        balance = tronWeb.fromSun(balance);
        console.log(`余额: ${balance} TRX`);
    }).catch(error => {
        console.error('获取余额失败:', error);
    });
    return balance;
}

function getTrc20Balance(address, abi, contractAddress) {
    const contract = tronWeb.contract(abi, contractAddress);
    let balance = 0;
    contract.methods.balanceOf(address).call().then(rs => {
        balance = tronWeb.fromSun(rs.balance);
        console.log(`余额: ${balance} TRX`);
    }).catch(error => {
        console.error('获取余额失败:', error)
    })
    return balance;
}
// 以下是调用合约TetherToken的示例

//加载合约TetherToken的ABI
const abi = jsonfile.readFileSync('./TetherTokenABI.json');
//TetherToken合约的地址
const contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const balance = getTrc20Balance(YOUR_TRON_ADDRESS, abi, contract)
console.log(balance);