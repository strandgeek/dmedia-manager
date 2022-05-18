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


So every time a user tries to access the MediaManager component in a dApp, a query in that method will be made and so the user will be authorized or blocked.


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
