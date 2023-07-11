//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

// We import this library to be able to use console.log
// import "hardhat/console.sol";
import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

struct Swag {
    // Printable swag name.
    string name;

    // Base64-encoded
    string image;
}

// Smart contract for registering a swag and then offering users to get their unique swag based
// on their address.
contract RandomSwag is ERC721 {
    string constant errProbabilityMismatch = "Probabilities should add up to 100";
    string constant errCountMismatch = "Swag/Probability count mismatch";
    string constant errForbidden = "Access forbidden by contract policy";

    // List of all swags.
    Swag[] _swags;

    // Probability of a draw for each swag in percentiles.
    uint256[] _probabilities;

    // Randomly generated mask for randomizing swag.
    uint256 _mask;

    // Owner of the contract with admin privileges.
    address _owner;

    // Mapping of unique swag token ID -> swag.
    uint[] private _tokenIds;

    constructor() ERC721("Oasis Swag EthCC 6", "SWG") {
        _mask = uint256(bytes32(Sapphire.randomBytes(32, "")));
        _owner = msg.sender;
    }

    // Add new swag with 0 probability for draw. Requires elevated privilege.
    function addSwag(string memory name, string memory image) external {
        require(msg.sender == _owner, errForbidden);
        _swags.push(Swag(name, image));
        _probabilities.push(0);
    }

    // Set probability vector for each swag to be drawn. Requires elevated privilege.
    function setProbabilities(uint256[] memory p) external {
        require(msg.sender == _owner, errForbidden);
        require(p.length == _probabilities.length, errCountMismatch);

        uint sum = 0;
        for(uint i = 0; i < p.length; i++) {
            sum += p[i];
        }
        require(sum == 100, errProbabilityMismatch);

        _probabilities = p;
    }

    // Dumps all registered swags and probabilities.
    function dumpSwags() external view returns (string[] memory, string[] memory, uint256[] memory) {
        string[] memory names = new string[](_swags.length);
        string[] memory images = new string[](_swags.length);

        for (uint i=0; i<_swags.length; i++) {
            names[i] = _swags[i].name;
            images[i] = _swags[i].image;
        }

        return (names, images, _probabilities);
    }

    // Gets a swag based on the user's Ethereum address. Returns the drawn swag index.
    // Requires signed call.
    function _drawSwagType() private view returns (uint) {
        require(msg.sender != address(0), errForbidden);

        uint p = uint256(keccak256(abi.encodePacked(_mask, msg.sender))) % 100;
        uint curP = 0;
        uint i=0;
        for (; i<_probabilities.length; i++) {
            curP += _probabilities[i];
            if (p < curP) {
                break;
            }
        }

        return i;
    }

    // Gets a swag based on the user's Ethereum address. Returns the name of a
    // swag and a Base64-encoded image.
    // Requires signed call.
    function drawSwag() external view returns (string memory, string memory) {
        uint i = _drawSwagType();

        return (_swags[i].name, _swags[i].image);
    }

    // Claims the Swag as NFT to the user's wallet.
    function claimSwag() public returns (uint256) {
        uint i = _drawSwagType();
        _tokenIds.push(i);

        uint256 newItemId = _tokenIds.length; // tokenID starts counting from 1!
        _mint(msg.sender, newItemId);

        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require((tokenId > 0) && (tokenId <= _tokenIds.length), errCountMismatch);
        uint i = _tokenIds[tokenId-1];
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "', _swags[i].name, '", "description": "Oasis Consensus 2023 Swag", "image": "', bytes(_swags[i].image), '"}'))));
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIds.length;
    }
}
