# dMedia Manager Contract Interface

This project contains the `IMediaManagerAccess` which is a interface that is used to control access on-chain to a dMedia Manager project.

Also, we have some examples:
- OwnerAccess
- WhitelistAccess


----


## dMedia Manager Access Interface

To allow dMedia Manager to authorize access from an address you must implement the interface below on your Smart Contract:


```solidity
interface IMediaMediaManagerAccess {
   function hasMediaManagerAccess(address) external view returns(bool);
}
```


So every time a user tries to access the MediaManager component in a dApp, a call to that method will be made and so the user will be authorized or blocked.


### Examples

#### OwnerAccess

Let's say you want allow access only to the contract owner, so basically the code below will fit your needs:

```solidity
contract OwnerAccess is IMediaMediaManagerAccess {
   address public owner;

   constructor() {
      owner = msg.sender;
   }

   function hasMediaManagerAccess(address _addr) external view override returns(bool) {
      return _addr == owner;
   }
}
```

#### WhitelistAccess

In case you want to have a list with pre-authorized address, you can use the example below:

```solidity
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
```
