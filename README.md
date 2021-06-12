# Stock Info Table Builder
 Builds a .CSV file (for Excel, Sheets, Numbers, etc) of the US Stock Market:
 
 Requires [Node.js and NPM](https://nodejs.org/en/)

1) Get a starter account on fmpcloud.io
2) Replace `YOUR_API_KEY` in index.js with your FMPCloud API key (from the Dashboard)
3) Go to project root directory in Terminal and run...
4) $ `npm install` to get your Node modules ready for running the script
5) $ `npm start` to run the script

As of March 2021, there were ~10k stocks returned and ~6k from exchanges with sufficient data. 

The script shows loading progress and takes about ~20-40 min to run due to multiple API paths and rate limiting.

**DISCLAIMER:** _The code user is solely responsible for verifying the validity of all data downloaded and the author of this script is not liable for any consequences of running the script or doing research from it. Use at your own risk._

### Table columns included:
* Symbol,
* Name,
* Exchange,
* Price,
* revenuePerShareTTM,
* netIncomePerShareTTM,
* operatingCashFlowPerShareTTM,
* freeCashFlowPerShareTTM,
* cashPerShareTTM,
* bookValuePerShareTTM,
* tangibleBookValuePerShareTTM,
* shareholdersEquityPerShareTTM,
* interestDebtPerShareTTM,
* marketCapTTM,
* enterpriseValueTTM,
* peRatioTTM,
* priceToSalesRatioTTM,
* pocfratioTTM,
* pfcfRatioTTM,
* pbRatioTTM,
* ptbRatioTTM,
* evToSalesTTM,
* enterpriseValueOverEBITDATTM,
* evToOperatingCashFlowTTM,
* evToFreeCashFlowTTM,
* earningsYieldTTM,
* freeCashFlowYieldTTM,
* debtToEquityTTM,
* debtToAssetsTTM,
* netDebtToEBITDATTM,
* currentRatioTTM,
* interestCoverageTTM,
* incomeQualityTTM,
* dividendYieldTTM,
* dividendYieldPercentageTTM,
* payoutRatioTTM,
* salesGeneralAndAdministrativeToRevenueTTM,
* researchAndDevelopementToRevenueTTM,
* intangiblesToTotalAssetsTTM,
* capexToOperatingCashFlowTTM,
* capexToRevenueTTM,
* capexToDepreciationTTM,
* stockBasedCompensationToRevenueTTM,
* grahamNumberTTM,
* roicTTM,
* returnOnTangibleAssetsTTM,
* grahamNetNetTTM,
* workingCapitalTTM,
* tangibleAssetValueTTM,
* netCurrentAssetValueTTM,
* investedCapitalTTM,
* averageReceivablesTTM,
* averagePayablesTTM,
* averageInventoryTTM,
* daysSalesOutstandingTTM,
* daysPayablesOutstandingTTM,
* daysOfInventoryOnHandTTM,
* receivablesTurnoverTTM,
* payablesTurnoverTTM,
* inventoryTurnoverTTM,
* roeTTM,
* capexPerShareTTM
