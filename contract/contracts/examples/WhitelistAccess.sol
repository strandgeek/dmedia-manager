// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../IMediaManagerAccess.sol";

contract WhitelistAccess is IMediaMediaManagerAccess {
   address private owner;
   mapping(address => bool) public whitelist;

   constructor() {
      owner = msg.sender;
   }

   modifier onlyOwner() {
      require(msg.sender == owner);
      _;
   }

   function hasMediaManagerAccess(address _addr) external view override returns(bool) {
      return whitelist[_addr];
   }

   function allow(address _addr) public onlyOwner {
      whitelist[_addr] = true;
   }

   function revoke(address _addr) public onlyOwner {
      whitelist[_addr] = false;
   }
}
