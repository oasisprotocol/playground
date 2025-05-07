// SPDX-License-Identifier: CC-PDDC

pragma solidity ^0.8.0;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract E2EProxy {
    Sapphire.Curve25519PublicKey internal immutable publicKey;

    Sapphire.Curve25519SecretKey internal immutable privateKey;

    constructor (bytes memory extra_entropy) {
        (publicKey, privateKey) = Sapphire.generateCurve25519KeyPair(extra_entropy);
    }

    function getPublicKey()
        external view
        returns (bytes32)
    {
        return Sapphire.Curve25519PublicKey.unwrap(publicKey);
    }

    function proxy(bytes32 peerPublicKey, bytes32 nonce, bytes memory data)
        external payable
    {
        bytes32 symmetricKey = Sapphire.deriveSymmetricKey(Sapphire.Curve25519PublicKey.wrap(peerPublicKey), privateKey);

        (address addr, bytes memory subcall_data) = abi.decode(Sapphire.decrypt(symmetricKey, nonce, data, ""), (address, bytes));

        (bool success, bytes memory subcall_ret) = addr.call{value: msg.value}(subcall_data);
    }
}
