const https = require('https');
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const fetch = require("node-fetch");
const { pRateLimit } = require('p-ratelimit');
const cliProgress = require('cli-progress');
const _colors = require('colors');

// Set a rate limit on key metrics API requests
const limit = pRateLimit({
  interval: 1000,             // N ms
  rate: 5,                    // N API calls per interval
  concurrency: 2,            // no more than N running at once
  // maxDelay: 3000              // an API call delayed > N ms is rejected
});

const apiUrl = "https://fmpcloud.io/api/v3/";
const apiKey = "YOUR_API_KEY";

const stocksUrl = apiUrl + "stock/list?apikey=" + apiKey;

axios.get(stocksUrl)
.then((response) => {

  let stockList = [];
  let stockSymbolList = [];
  let linkList = [];
  let stockMetrics = [];
  let keyMetrics = [];

  const approvedExchanges = [
    "NYSE Arca",
    "Nasdaq Global Select",
    "New York Stock Exchange",
    "NASDAQ Global Market",
    "NASDAQ Capital Market",
    "BATS Exchange",
    "NYSE American",
    "Nasdaq",
    "NYSE",
    "NasdaqGM",
    // "Other OTC",   // Not listed on RH
    "NYSEArca",
    // "BATS",        // No data points
    // "NasdaqGS",    // Few data points
    "NasdaqCM"
  ];

  response.data.forEach(stock => {
    if(approvedExchanges.includes(stock.exchange)) {
      stockSymbolList.push(stock.symbol);
      stockList.push({ symbol: stock.symbol, exchange: stock.exchange, name: stock.name, price: stock.price });

      const keyMetricsTTMUrl = apiUrl + "key-metrics-ttm/" + stock.symbol + "?apikey=" + apiKey;
      linkList.push(keyMetricsTTMUrl);
    }
  })

  let promiseArr = linkList.map((l, i) => {
    return limit(() => fetch(l).then(res => res.json()))
  });

  let progress = 0;
  let previousProgress = 0;

  const updatesPerSecond = 10;
  promiseArr.forEach(p => p.then(() => progress++));

  console.log('\n');

  const progressBar = new cliProgress.SingleBar({
    format: 'Loaded {value}/{total} stocks in {duration_formatted} ' + _colors.cyan('{bar}') + ' {percentage}% || {eta_formatted} left || Speed: {speed}/s',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    barSize: 10,
  }, cliProgress.Presets.shades_classic);
  progressBar.start(promiseArr.length, 1);

  const showPorgress = setInterval(() => {
    const speed = (progress - previousProgress) * updatesPerSecond;
    progressBar.update(progress, { speed: speed });
    previousProgress = progress;
  }, 1000 / updatesPerSecond);

  Promise.all(promiseArr).then(res => {
    /* do something with res here... */
    stockMetrics.push(res);
  })

  // When all data loaded
  Promise.allSettled(promiseArr).then(res => {
    recordProcess("✅ done loading key metrics");
    clearInterval(showPorgress);
    progressBar.stop();
    console.log('\n');

    stockMetrics[0].forEach((metric, i) => {
      if(metric && metric[0] && !hasNEmptyValues(metric[0], 50) && stockList[i] && stockList[i].symbol && stockList[i].exchange && stockList[i].name && stockList[i].price) {
        metric[0].symbol = stockList[i].symbol.replaceAll(",", "");
        metric[0].exchange = stockList[i].exchange.replaceAll(",", "");
        metric[0].price = stockList[i].price;
        metric[0].name = stockList[i].name.replaceAll(",", "");
        keyMetrics.push(metric[0]);
      }
    })

    writeRecordsToFile(stockSymbolList, linkList, keyMetrics);
  })
})
.catch(function (error) {
  // handle error
  console.log(error);
})

// Write everything to files
const writeRecordsToFile = (stockList, linkList, keyMetrics) => {

  stockListString = stockList.toString().replace(/,/g,",\n");
  linkListString = linkList.toString().replace(/,/g,",\n");

  // Test text files
  fs.writeFile("stocks.txt", stockListString, err => {
    if (err) throw err;
    console.log('✅ stocks.txt successfully written to disk');
  })

  fs.writeFile("links.txt", linkListString, err => {
    if (err) throw err;
    console.log('✅ links.txt successfully written to disk');
  })

  // Final CSV document
  const filename = 'key-metrics.csv';

  const extractAsCSV = (stocks) => {
    const header = ["Symbol, Name, Exchange, Price, revenuePerShareTTM, netIncomePerShareTTM, operatingCashFlowPerShareTTM, freeCashFlowPerShareTTM, cashPerShareTTM, bookValuePerShareTTM, tangibleBookValuePerShareTTM, shareholdersEquityPerShareTTM, interestDebtPerShareTTM, marketCapTTM, enterpriseValueTTM, peRatioTTM, priceToSalesRatioTTM, pocfratioTTM, pfcfRatioTTM, pbRatioTTM, ptbRatioTTM, evToSalesTTM, enterpriseValueOverEBITDATTM, evToOperatingCashFlowTTM, evToFreeCashFlowTTM, earningsYieldTTM, freeCashFlowYieldTTM, debtToEquityTTM, debtToAssetsTTM, netDebtToEBITDATTM, currentRatioTTM, interestCoverageTTM, incomeQualityTTM, dividendYieldTTM, dividendYieldPercentageTTM, payoutRatioTTM, salesGeneralAndAdministrativeToRevenueTTM, researchAndDevelopementToRevenueTTM, intangiblesToTotalAssetsTTM, capexToOperatingCashFlowTTM, capexToRevenueTTM, capexToDepreciationTTM, stockBasedCompensationToRevenueTTM, grahamNumberTTM, roicTTM, returnOnTangibleAssetsTTM, grahamNetNetTTM, workingCapitalTTM, tangibleAssetValueTTM, netCurrentAssetValueTTM, investedCapitalTTM, averageReceivablesTTM, averagePayablesTTM, averageInventoryTTM, daysSalesOutstandingTTM, daysPayablesOutstandingTTM, daysOfInventoryOnHandTTM, receivablesTurnoverTTM, payablesTurnoverTTM, inventoryTurnoverTTM, roeTTM, capexPerShareTTM"];
    const rows = stocks.map(stock =>
       `${stock.symbol}, ${stock.name}, ${stock.exchange}, ${stock.price}, ${stock.revenuePerShareTTM}, ${stock.netIncomePerShareTTM}, ${stock.operatingCashFlowPerShareTTM}, ${stock.freeCashFlowPerShareTTM}, ${stock.cashPerShareTTM}, ${stock.bookValuePerShareTTM}, ${stock.tangibleBookValuePerShareTTM}, ${stock.shareholdersEquityPerShareTTM}, ${stock.interestDebtPerShareTTM}, ${stock.marketCapTTM}, ${stock.enterpriseValueTTM}, ${stock.peRatioTTM}, ${stock.priceToSalesRatioTTM}, ${stock.pocfratioTTM}, ${stock.pfcfRatioTTM}, ${stock.pbRatioTTM}, ${stock.ptbRatioTTM}, ${stock.evToSalesTTM}, ${stock.enterpriseValueOverEBITDATTM}, ${stock.evToOperatingCashFlowTTM}, ${stock.evToFreeCashFlowTTM}, ${stock.earningsYieldTTM}, ${stock.freeCashFlowYieldTTM}, ${stock.debtToEquityTTM}, ${stock.debtToAssetsTTM}, ${stock.netDebtToEBITDATTM}, ${stock.currentRatioTTM}, ${stock.interestCoverageTTM}, ${stock.incomeQualityTTM}, ${stock.dividendYieldTTM}, ${stock.dividendYieldPercentageTTM}, ${stock.payoutRatioTTM}, ${stock.salesGeneralAndAdministrativeToRevenueTTM}, ${stock.researchAndDevelopementToRevenueTTM}, ${stock.intangiblesToTotalAssetsTTM}, ${stock.capexToOperatingCashFlowTTM}, ${stock.capexToRevenueTTM}, ${stock.capexToDepreciationTTM}, ${stock.stockBasedCompensationToRevenueTTM}, ${stock.grahamNumberTTM}, ${stock.roicTTM}, ${stock.returnOnTangibleAssetsTTM}, ${stock.grahamNetNetTTM}, ${stock.workingCapitalTTM}, ${stock.tangibleAssetValueTTM}, ${stock.netCurrentAssetValueTTM}, ${stock.investedCapitalTTM}, ${stock.averageReceivablesTTM}, ${stock.averagePayablesTTM}, ${stock.averageInventoryTTM}, ${stock.daysSalesOutstandingTTM}, ${stock.daysPayablesOutstandingTTM}, ${stock.daysOfInventoryOnHandTTM}, ${stock.receivablesTurnoverTTM}, ${stock.payablesTurnoverTTM}, ${stock.inventoryTurnoverTTM}, ${stock.roeTTM}, ${stock.capexPerShareTTM}`
    );
    return header.concat(rows).join("\n");
  }

  fs.writeFile(filename, extractAsCSV(keyMetrics), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`✅ ${filename} successfully written to disk`);
    }
  });
}

function hasNEmptyValues(obj, n) {
  let emptyKeys = 0;
  for (var key in obj) {
    if (obj[key] == null || obj[key] == "")
      emptyKeys++;
  }
  const result = emptyKeys > n ? true : false;
  return result;
}

function recordProcess(string) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(string);
}
