const MarbleCoin = artifacts.require("MarbleCoin");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(MarbleCoin)
};