const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    
    console.log("Contract deployed to:", waveContract.address);
    
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());
    
    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    // await waveTxn.wait();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

runMain();