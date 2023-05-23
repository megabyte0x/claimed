// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/Context.sol";

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract Quest is Context, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

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

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );
    }

    function _beforeTokenTransfer(
        address from, /* from */
        address,
        uint256 amount
    ) internal view override {
        require(
            companyBalanceAmount[from] >= amount,
            "ERR:NF"
        );
    }

    receive () external payable {}

}