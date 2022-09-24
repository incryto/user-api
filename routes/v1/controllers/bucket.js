const axios = require('axios')

 async function getCurrentPrice(bucket_coins){
  
  const coin_map = new Map();
  coin_list = [];

  for (var coin in bucket_coins) {
    console.log(coin);
    coin_map.set(bucket_coins[coin]["id"], bucket_coins[coin]["quantity"]);
    coin_list.push(bucket_coins[coin]["id"]);
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coin_list.join(
    "%2C"
  )}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  var result = await axios.get(url)
  result = result.data
  return result
}

module.exports = {
  getCurrentPrice
}