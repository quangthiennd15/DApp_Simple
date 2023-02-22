const MyToken = artifacts.require("ERC20");
const MyNFT = artifacts.require("ERC721");


module.exports = function (deployer) {
  deployer.deploy(MyToken, "ThienNQ", "TK");
  deployer.deploy(MyNFT, "ThienNFT", "TF");

};