// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract Quest is Context {

    mapping(address => uint256) companyBalanceAmount; 

    function lockAmount() external payable  {
        require(msg.value>0, "ERR:ZV");
        payable(address(this)).transfer(msg.value);
        companyBalanceAmount[_msgSender()] += msg.value;
    }

    function claim ( address company, uint256 payableAmount) external {
        require (companyBalanceAmount[company] >= payableAmount, "ERR:NF");
        companyBalanceAmount[company] -= payableAmount;
        payable(_msgSender()).transfer(payableAmount);
    }

    function getLockAmount(address companyAddress) external view returns(uint256) {
        return companyBalanceAmount[companyAddress];
    } 

    receive () external payable {}

}