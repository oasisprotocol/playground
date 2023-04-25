import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("RandomSwag", function () {
  async function deployRandomSwagFixture() {
    const swags = [
      {name:"cap", image:"s0M3b4536431c0d3d\\1m4G3"},
      {name:"ROSE", image:""},
    ];
    const p = [80, 20];

    const RandomSwag = await ethers.getContractFactory("RandomSwag");
    const rs = await RandomSwag.deploy();

    for (const s of swags) {
      await rs.addSwag(s.name, s.image);
    }
    await rs.setProbabilities(p);

    return { rs, swags, p };
  }

  it("Should register and dump swags", async function () {
    const { rs } = await loadFixture(deployRandomSwagFixture);
    const [ swags, images, p ] = await rs.dumpSwags();
    expect(swags.length).to.equal(2);
    expect(images.length).to.equal(2);
    expect(p.length).to.equal(2);
  });

  it("Should set probability", async function () {
    const { rs } = await loadFixture(deployRandomSwagFixture);

    const [_owner, addr1, addr2, addr3, addr4, addr5, addr6] = await ethers.getSigners();
    const rs1 = await rs.connect(addr1).drawSwag();
    expect(rs1[0]).to.equal("cap");
    const rs2 = await rs.connect(addr2).drawSwag();
    expect(rs2[0]).to.equal("cap");
    const rs3 = await rs.connect(addr3).drawSwag();
    expect(rs3[0]).to.equal("cap");
    const rs4 = await rs.connect(addr4).drawSwag();
    expect(rs4[0]).to.equal("cap");
    const rs5 = await rs.connect(addr5).drawSwag();
    expect(rs5[0]).to.equal("ROSE");
    const rs6 = await rs.connect(addr6).drawSwag();
    expect(rs6[0]).to.equal("ROSE");

    await rs.setProbabilities([50, 50]);

    const nrs1 = await rs.connect(addr1).drawSwag();
    expect(nrs1[0]).to.equal("cap");
    const nrs2 = await rs.connect(addr2).drawSwag();
    expect(nrs2[0]).to.equal("cap");
    const nrs3 = await rs.connect(addr3).drawSwag();
    expect(nrs3[0]).to.equal("ROSE");
    const nrs4 = await rs.connect(addr4).drawSwag();
    expect(nrs4[0]).to.equal("ROSE");
    const nrs5 = await rs.connect(addr5).drawSwag();
    expect(nrs5[0]).to.equal("ROSE");
    const nrs6 = await rs.connect(addr6).drawSwag();
    expect(nrs6[0]).to.equal("ROSE");
  });

  it("Should mint NFT", async function () {
    const {rs} = await loadFixture(deployRandomSwagFixture);

    const [_owner, addr1, _addr2, _addr3, _addr4, _addr5, addr6] = await ethers.getSigners();
    const rs1 = await rs.connect(addr1);
    await rs1.claimSwag();
    expect(await rs1.tokenURI(1)).to.equal("data:application/json;base64,eyJuYW1lIjogImNhcCIsICJkZXNjcmlwdGlvbiI6ICJPYXNpcyBDb25zZW5zdXMgMjAyMyBTd2FnIiwgImltYWdlIjogInMwTTNiNDUzNjQzMWMwZDNkXDFtNEczIn0=");

    const rs6 = await rs.connect(addr6);
    await rs6.claimSwag();
    expect(await rs6.tokenURI(2)).to.equal("data:application/json;base64,eyJuYW1lIjogIlJPU0UiLCAiZGVzY3JpcHRpb24iOiAiT2FzaXMgQ29uc2Vuc3VzIDIwMjMgU3dhZyIsICJpbWFnZSI6ICIifQ==");
  });
});
