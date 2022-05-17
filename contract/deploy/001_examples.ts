// import { HardhatRuntimeEnvironment } from "hardhat/config";
// import { DeployFunction } from "hardhat-deploy/types";
// import { parseEther } from "ethers/lib/utils";

const func = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("OwnerAccess", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
};
exports.default = func
func.tags = ["OwnerAccess"];
