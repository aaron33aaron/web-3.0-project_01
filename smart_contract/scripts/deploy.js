const  main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  // Deploying transactions
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  // Console logging the transactions deployed to address
  console.log("Transactions deployed to: ", transactions.address);
}

const runMain = async () => {
  try {
    // await main function
    await main();
    process.exit(0);
  } catch (error) {
    // console log error
    console.error(error);
    process.exit(1);
  }
}


runMain();
