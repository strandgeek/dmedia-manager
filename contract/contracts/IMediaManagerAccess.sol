// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IMediaMediaManagerAccess {
   function hasMediaManagerAccess(address) external view returns(bool);
}
