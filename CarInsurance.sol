pragma solidity ^0.4.23;
contract CarInsurance {
    
    address public customer; 
    address public insurance_company;
    address public resolver;
    uint public eligible_for_insurance = 0;
    uint InsuranceCompanyset = 0;
    uint resolverset = 0;
    
constructor() public{
    customer = msg.sender;
}

function setInsuranceCompany(address _InsuranceCompany) public{
    if(InsuranceCompanyset == 0){
        insurance_company = _InsuranceCompany;
        InsuranceCompanyset = 1;
    }
}

function setResolver(address _resolver) public{
    if(resolverset == 0){
        resolver = _resolver;
        resolverset = 1;
    }
}

function payPremium() public payable {
    require(msg.value >= 0.02 ether);
}

function insuranceAmount() public payable {
    require(msg.value >= 0.22 ether);
}
    
function claimInsurance() public{
    if(eligible_for_insurance == 1){
        customer.transfer(address(this).balance);    
    }
}

function approveInsurance() public {
    require(msg.sender == resolver);
    eligible_for_insurance = 1;
}
     
}