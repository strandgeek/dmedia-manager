module.exports = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("OwnerAccess", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("WhitelistAccess", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};
