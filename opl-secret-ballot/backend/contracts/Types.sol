// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotTerminated();
error NotActive();

type ProposalId is bytes32;

struct ProposalParams {
    string ipfsHash;
    uint16 numChoices;
    bool publishVotes;
}

struct Outcome {
    address payable payee;
    uint128 payment;
}

interface CallProxy {
    function anyCall(
        address _to,
        bytes calldata _data,
        uint256 _toChainID,
        uint256 _flags,
        bytes calldata _extdata
    ) external payable;

    function context() external view returns (address from, uint256 fromChainID, uint256 nonce);

    function executor() external view returns (address executor);
}
