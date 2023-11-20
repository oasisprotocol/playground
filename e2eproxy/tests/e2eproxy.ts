// SPDX-License-Identifier: CC-PDDC

import { randomBytes } from "crypto";
import { expect } from 'chai';
import { ethers } from "hardhat";
import { Interface } from '@ethersproject/abi';

import * as sapphire from '@oasisprotocol/sapphire-paratime'

describe('E2EProxy', function () {
    async function deploy() {
        const Example_Contract = await ethers.getContractFactory("Example");
        const example = await Example_Contract.deploy();

        const extra_entropy = randomBytes(128);

        const E2EProxy_Contract = await ethers.getContractFactory("E2EProxy");
        const e2e = await E2EProxy_Contract.deploy(ethers.utils.arrayify(extra_entropy));

        return { example, e2e };
    }

    it("End-to-end encrypted proxied call", async function ()
    {
        const {example, e2e} = await deploy();

        // Create the calldata for an example function call
        const iface = new Interface([
            "function transferFrom(address from, address to, uint amount)"
        ]);
        const example_calldata = iface.encodeFunctionData("transferFrom", [
            "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "0xaB7C8803962c0f2F5BBBe3FA8bf41cd82AA1923C",
            ethers.utils.parseEther("789.10111213")
        ])

        // Encode the proxied call, specifying the address of the contract to invoke and its calldata
        const plaintext = ethers.utils.defaultAbiCoder.encode([ "address", "bytes" ], [ example.address, example_calldata ]);

        // Retrieve E2EProxy long-term public key & encrypt the proxied contract call with an ephemeral keypair
        const e2e_pubkey = await e2e.getPublicKey();
        const box = sapphire.cipher.X25519DeoxysII.ephemeral(e2e_pubkey);
        let {nonce, ciphertext} = await box.encrypt(ethers.utils.arrayify(plaintext));
        const nonce_bytes32_hex = ethers.utils.hexlify(nonce) + "0000000000000000000000000000000000";

        // Invoke the proxy contract
        const result = await e2e.proxy(box.publicKey, nonce_bytes32_hex, ciphertext, {value: ethers.utils.parseUnits("123456", "wei")});
        const receipt = await result.wait();

        // Verify the parameters received from the Example contract via proxy
        let found = false;
        if( receipt.events ) {
            for( const r of receipt.events?.values() ) {
                if( r.address == example.address ) {
                    const ev = example.interface.events['Called(address,uint256,bytes)'];
                    const decoded = example.interface.decodeEventLog(ev, r.data, r.topics);
                    expect(decoded.from).equals(e2e.address);
                    expect(decoded.value).equals(123456);
                    expect(decoded.data).equals(example_calldata);
                    found = true;
                }
            }
        }
        expect(found).equals(true);
    });
});
