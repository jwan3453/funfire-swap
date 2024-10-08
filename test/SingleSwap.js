const { expect } = require("@ethereum-waffle/chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


describe("SingleSwapToken", () => {
    let singleSwapToken;
    let accounts;
    let weth; 
    let dai;
    let usdc;
    before(async () => {

        accounts = await ethers.getSigners(1);

        const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
        singleSwapToken = await SingleSwapToken.deploy();
        await singleSwapToken.deployed();

        weth = await ethers.getContractAt("IWETH", WETH9);
        dai = await ethers.getContractAt("IERC20", DAI);
        usdc = await ethers.getContractAt("IERC20", USDC);

            

        const BooToken = await ethers.getContractFactory("BooToken");
        BooTokenDeploy = await BooToken.deploy();
        await BooTokenDeploy.deployed();
        console.log('BooToken', BooTokenDeploy);
        const  balance = await BooTokenDeploy.balanceOf(accounts[0].address)
        const transferAmount = BigNumber.from(balance).toString();
        const ethValue = ethers.utils.formatEther(transferAmount);
        console.log("BooToken balance", accounts[0].address,  BooTokenDeploy.address, ethValue);

      });
      
      it("swapExactInputSingle", async () => {
        const amountIn = 10n ** 18n;
        // console.log('amountIn', amountIn);
        // // Deposit WETH
        // await weth.deposit({ value: amountIn });
        // await weth.approve(singleSwapToken.address, amountIn);
        // console.log('singleSwapToken.address', weth.address)
        // // Swap
        // await singleSwapToken.swapExactInputSingle(weth.address, dai.address, amountIn);
        // console.log("DAI balance", await dai.balanceOf(accounts[0].address));
      });
})

