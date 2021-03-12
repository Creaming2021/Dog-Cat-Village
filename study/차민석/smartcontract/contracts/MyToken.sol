pragma solidity >=0.4.22 <0.9.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract MyToken is ERC20 {
    uint public INITIAL_SUPPLY = 120000;

    constructor() public ERC20("My token", "MT") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}