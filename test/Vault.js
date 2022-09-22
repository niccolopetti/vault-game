const { expect } = require("chai");

describe("Vault contract", function () {
  let vault;
  let deployer;
  beforeEach(async function () {
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy({ value: ethers.utils.parseEther("1") });
  });

  it("Hack", async function () {
    [deployer, depositor] = await ethers.getSigners();
    let flagHolder = await vault.flagHolder();
    expect(flagHolder).to.equal("0x0000000000000000000000000000000000000000");

     const Attacker = await ethers.getContractFactory("Attacker");
     let attacker = await Attacker.deploy(vault.address);
     await attacker.deployTransaction.wait();
     const tx = await attacker.connect(deployer).attack({
      value: ethers.utils.parseEther("0.1"),
    });
    await tx.wait();
    flagHolder = await vault.flagHolder();
    expect(flagHolder).to.equal(deployer.address);
  });
});
