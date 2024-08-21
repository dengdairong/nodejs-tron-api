import axios from "axios";
import TronWeb from 'tron-api';
// 设置TRON的RPC地址
const TRON_RPC_URL = 'https://api.trongrid.io/';

// 您的TRON地址
const YOUR_TRON_ADDRESS = 'TPEmvqjffLJfi2R4dsxQ2gVBt5XBFMpMqo';

//获取账户余额
function getBalance(address) {
    // 构建获取余额的请求URL
    // const getBalanceUrl = `${TRON_RPC_URL}wallet/getaccount?address=${YOUR_TRON_ADDRESS}`;
    const url = `${TRON_RPC_URL}wallet/getaccount`;

    let balance = 0;
    axios.post(url, {address: base58ToHexString(address)})
        .then(response => {
            // 假设您要获取的是TRX的余额
            balance = response.data;
            console.log('您的TRX余额是:', balance);
        })
        .catch(error => {
            console.error('获取余额时发生错误:', error);
        });
    return balance;
}
// 检查地址是否正确
function validateaddress(address){
    const url = `${TRON_RPC_URL}wallet/validateaddress`;
    let isOk = true;
    axios.post(url, {address: base58ToHexString(address)})
        .then(response => {
            isOk = response.data.result;
            if(!isOk){
                console.log('validateaddress error msg:', response.data.message);
            }
        })
        .catch(error => {
            console.error('validateaddress error:', error);
        });
    return balance;
}
function base58ToHexString(base58Str) {
    return tronWeb.address.toHex(YOUR_TRON_ADDRESS);;
}

console.log(base58ToHexString(YOUR_TRON_ADDRESS)); // 输出转换后的hex字符串
// 配置TronWeb实例，需要传入全节点的URL
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io' // 这里使用TRONGrid的免费全节点服务
});
