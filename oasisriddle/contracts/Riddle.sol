// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Riddle {
    string constant errInvalidCoupon = "Invalid coupon";
    string constant errCouponExists = "Coupon already exists";
    string constant errWrongAnswer = "Wrong answer";
    string constant errForbidden = "Access forbidden by contract policy";

    // Owner of the contract.
    address _owner;
    // List of questions.
    string[] _questions;
    // List of answers.
    string[] _answers;
    // Coupon -> index in _ethPrivateKeys + 1 mapping.
    mapping(string => uint) _coupons;
    // List of Base16-encoded Eth private keys
    string[] _privKeys;
    // List of private keys indices which can be claimed.
    bool[] _awardedPrivKeys;

    constructor(string[] memory questions, string[] memory answers, string[] memory coupons, string[] memory privKeys) payable {
        require(questions.length == answers.length, "List of questions must match list of answers.");
        require(coupons.length == privKeys.length, "Number of coupons must match private keys.");

        _owner = msg.sender;
	    _questions = questions;_answers = answers;
        for (uint i=0; i< coupons.length; i++) {
            // Store index+1 since invalid coupon lookups return 0.
            _coupons[coupons[i]] = i+1;
        }
        _privKeys = privKeys;
        _awardedPrivKeys = new bool[](coupons.length);
    }

    // Find and return the question matching given coupon code.
    function getQuestion(string memory coupon) external view returns (string memory) {
        require(msg.sender != address(0), errForbidden);
        require(_coupons[coupon] != 0, errInvalidCoupon);
	    return _questions[computeQuestionIndex(coupon)];
    }

    // Submit the answer to the question given coupon code.
    function submitAnswer(string memory coupon, string memory answer) external {
        require(msg.sender != address(0), errForbidden);
        require(_coupons[coupon] != 0, errInvalidCoupon);
        require(keccak256(bytes(_answers[computeQuestionIndex(coupon)])) == keccak256(bytes(answer)), errWrongAnswer);
        _awardedPrivKeys[_coupons[coupon]-1] = true;
    }

    // Claim private key of the reward, if the submitted answer was correct.
    function claimReward(string memory coupon) external view returns (string memory) {
        require(msg.sender != address(0), errForbidden);
        require(_coupons[coupon] != 0, errInvalidCoupon);
        require(_awardedPrivKeys[_coupons[coupon]-1] == true, errInvalidCoupon);
        return _privKeys[_coupons[coupon]-1];
    }

    // Register new coupon for the riddle associated with the private key.
    function addCoupon(string memory coupon, string memory privKey) external {
        require(_owner == msg.sender, errForbidden);
        require(_coupons[coupon] == 0, errCouponExists);

        _awardedPrivKeys.push(false);
        _privKeys.push(privKey);
        _coupons[coupon] = _privKeys.length;
    }

    // Return the number of all registered coupon codes and the ones which rewards can be claimed.
    function countCoupons() external view returns (uint, uint) {
        require(_owner == msg.sender, errForbidden);

        uint count = 0;
        for (uint i=0; i< _awardedPrivKeys.length; i++) {
            if (_awardedPrivKeys[i]) {
                count++;
            }
        }
        return (_privKeys.length, count);
    }

    // Helper for computing index of the question matching the coupon code.
    function computeQuestionIndex(string memory coupon) private view returns (uint) {
        return uint(keccak256(bytes(coupon))) % _questions.length;
    }
}
