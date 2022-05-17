// https://eth-ropsten.alchemyapi.io/v2/gnUVJPvoJC7y-epJRyLfix0AyjLV4sJO

require('@nomiclabs/hardhat-waffle')

// export for our hardhat config
module.exports = {
  // version of solidity is 0.8.0
  solidity: '0.8.0',
  // specyifying networks being used as an object
  networks: {
    ropsten: {
      // alchemy url
      url: 'https://eth-ropsten.alchemyapi.io/v2/gnUVJPvoJC7y-epJRyLfix0AyjLV4sJO',
      // metamask Rapsten Test Net PK
      accounts: [ '4105cd4897a440d06ea29064c7bcadebaabbc0a2a422eb29f410fc642bd47f43' ]
    }
  }
}
