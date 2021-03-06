# 🏦 Stock Info Table Builder
 Builds a detailed .CSV report (for Excel, Sheets, Numbers, etc) of the US Stock Market:
 
 Requires [Node.js + NPM](https://nodejs.org/en/) and a starter account on [FMPCloud](https://fmpcloud.io/)

1) After getting a starter account on fmpcloud.io ...
2) Replace `YOUR_API_KEY` in index.js with your FMPCloud API key (from the Dashboard)
3) Go to project root directory in Terminal and run...
4) $ `npm install` to get your Node modules ready for running the script
5) $ `npm start` to run the script

As of March 2021, there were ~10k stocks returned and ~6k from exchanges with sufficient data. 

The script shows loading progress and takes about ~20-40 min to run due to multiple API paths and rate limiting.

**DISCLAIMER:** _The code's user is solely responsible for verifying the validity of all data downloaded and the author of this script is not liable for any consequences of running the script or doing research from it. Before you pay for FMPCloud, note that the script is a personal project and is not guaranteed to work with FMPCloud. Use at your own risk._

## Table columns included:
* Symbol
* Name
* Exchange
* Price
* revenuePerShareTTM
* netIncomePerShareTTM
* operatingCashFlowPerShareTTM
* freeCashFlowPerShareTTM
* cashPerShareTTM
* bookValuePerShareTTM
* tangibleBookValuePerShareTTM
* shareholdersEquityPerShareTTM
* interestDebtPerShareTTM
* marketCapTTM
* enterpriseValueTTM
* peRatioTTM
* priceToSalesRatioTTM
* pocfratioTTM
* pfcfRatioTTM
* pbRatioTTM
* ptbRatioTTM
* evToSalesTTM
* enterpriseValueOverEBITDATTM
* evToOperatingCashFlowTTM
* evToFreeCashFlowTTM
* earningsYieldTTM
* freeCashFlowYieldTTM
* debtToEquityTTM
* debtToAssetsTTM
* netDebtToEBITDATTM
* currentRatioTTM
* interestCoverageTTM
* incomeQualityTTM
* dividendYieldTTM
* dividendYieldPercentageTTM
* payoutRatioTTM
* salesGeneralAndAdministrativeToRevenueTTM
* researchAndDevelopementToRevenueTTM
* intangiblesToTotalAssetsTTM
* capexToOperatingCashFlowTTM
* capexToRevenueTTM
* capexToDepreciationTTM
* stockBasedCompensationToRevenueTTM
* grahamNumberTTM
* roicTTM
* returnOnTangibleAssetsTTM
* grahamNetNetTTM
* workingCapitalTTM
* tangibleAssetValueTTM
* netCurrentAssetValueTTM
* investedCapitalTTM
* averageReceivablesTTM
* averagePayablesTTM
* averageInventoryTTM
* daysSalesOutstandingTTM
* daysPayablesOutstandingTTM
* daysOfInventoryOnHandTTM
* receivablesTurnoverTTM
* payablesTurnoverTTM
* inventoryTurnoverTTM
* roeTTM
* capexPerShareTTM


## List of possible exchanges:
* NYSE Arca
* Nasdaq Global Select
* New York Stock Exchange
* NASDAQ Global Market
* NASDAQ Capital Market
* BATS Exchange
* NYSE American
* Nasdaq
* NYSE
* NasdaqGM
* Other OTC
* YHD
* Paris
* Amsterdam
* Brussels
* Lisbon
* Toronto
* NYSEArca
* BATS
* Swiss
* MCX
* XETRA
* NSE
* LSE
* SIX
* HKSE
* ASX
* OSE
* Sao Paolo
* TSXV
* Frankfurt
* NMS
* HKG
* NCM
* MCE
* ASE
* OSL
* Oslo
* FGI
* Irish
* NasdaqGS
* NasdaqCM
