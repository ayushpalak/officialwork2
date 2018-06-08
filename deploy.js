const HDWalletProvider = require('truffle-hdwallet-provider'); // part of ganache that will provide the accounts to use.
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

console.log("doing it. . . ");
const provider = new HDWalletProvider(
  //'process ill lion upon blur recall suffer shop lab used believe much', // my 12 words mnemonic
    //'https://rinkeby.infura.io/UoLq1d5g8L3cuqKKV5V3'  // infura endpoint for a node that will deploy contract.

    'fury fiber fossil raven render dwarf inmate atom rib test twelve visual',
    'http://localhost:8545'


);

var customer_address = '';
var insurance_compnay_address = '';
var resolver_address = '';


const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  customer_address = accounts[0];
  insurance_compnay_address = accounts[1];
  resolver_address = accounts[2];


  console.log('Attempting to deploy from account', accounts[0]);




    var initcustomerbalance = await web3.eth.getBalance(customer_address);
    console.log("before balance is ",initcustomerbalance);


  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });


    console.log('Contract deployed to', result.options.address);

  const set_insurance_company_address = await result.methods.setInsuranceCompany.call(insurance_compnay_address,{
        from: accounts[2]});

  const set_resolver_address = await result.methods.setInsuranceCompany.call(resolver_address,{
        from: accounts[3]});

  const payPremium = await result.methods.payPremium.send({
     gas: '4000000', from: accounts[0] , value: web3.utils.toWei('22', 'ether')});

  const insuranceAmount = await result.methods.insuranceAmount.send({
     gas: '4000000', from: accounts[1] , value: web3.utils.toWei('22', 'ether')});

  const approveInsurance = await result.methods.approveInsurance.call({
        from: accounts[3]});

  const claimInsurance = await result.methods.claimInsurance.call({
        from: accounts[1]});


  var customerbalance = await web3.eth.getBalance(customer_address);
  console.log("later balance is ",customerbalance);
  console.log("balance used ",customerbalance - initcustomerbalance);


};
deploy();
