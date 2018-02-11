const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress,amount){
        this.fromAddress= fromAddress;
        this.toAddress= toAddress;
        this.amount= amount;
    }
}
class Block{
    constructor( timestamp,transaction, previousHash=''){
        
        this.timestamp=timestamp;
        this.transaction =transaction;
        this.previousHash=previousHash;
        this.hash= this.calculateHash();
        this.nonce= 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.date)+ this.nonce).toString();
        }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) != Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash= this.calculateHash();
        }
        console.log("Block mined:"+this.hash);
    }

}
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransaction = [];
        this.miningReward= 100;

    }
    createGenesisBlock(){
        return new Block(0,"01/01/2018","Genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1 ];
    }
    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/
    minePendingTransaction(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined");
        this.chain.push(block);

        this.pendingTransaction=[
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    createTransaction(transaction){
        this.pendingTransaction.push(transaction);
    }

    getBalanceofAddress(address){
        let balance = 0;
        
        for(const block of this.chain){
            for(const trans of block.transaction){
                if(trans.fromAddress === address){
                    balance-=trans.amount;
        
                }
                if(trans.toAddress === address){
                    balance+=trans.amount;
                }
            }
        }
        return balance;
    }
    isChainValid(){
        for(let i=1; i<this.chain.length;i++){
            const currentBlock= this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}


 let pranCoin = new Blockchain();
 
pranCoin.createTransaction(new Transaction("address1", "address2", 100));
pranCoin.createTransaction(new Transaction("address2", "address1", 10));

console.log("\n starting the miner...");
pranCoin.minePendingTransaction("raj-address");
console.log("\nbalance of xaview is" , pranCoin.getBalanceofAddress("raj-address"));

console.log("\n starting the miner again...");
pranCoin.minePendingTransaction("raj-address");
console.log("\nbalance of xaview is" , pranCoin.getBalanceofAddress("raj-address"));
