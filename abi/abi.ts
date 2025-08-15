export const POOL_ABI = [
  {
    "inputs": [{ "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }, {
      "internalType": "contract IReserveInterestRateStrategy",
      "name": "interestRateStrategy_",
      "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "address", "name": "target", "type": "address" }],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  { "inputs": [], "name": "AssetNotListed", "type": "error" },
  { "inputs": [], "name": "CallerNotAToken", "type": "error" },
  { "inputs": [], "name": "CallerNotPoolAdmin", "type": "error" },
  { "inputs": [], "name": "CallerNotPoolConfigurator", "type": "error" },
  { "inputs": [], "name": "CallerNotPositionManager", "type": "error" },
  { "inputs": [], "name": "CallerNotUmbrella", "type": "error" },
  { "inputs": [], "name": "EModeCategoryReserved", "type": "error" },
  { "inputs": [], "name": "FailedCall", "type": "error" },
  { "inputs": [], "name": "InvalidAddressesProvider", "type": "error" },
  { "inputs": [], "name": "ZeroAddressNotValid", "type": "error" },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      {
        "indexed": false,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      { "indexed": false, "internalType": "uint256", "name": "borrowRate", "type": "uint256" },
      { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "Borrow",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" }, {
      "indexed": false,
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "amountCovered", "type": "uint256" }],
    "name": "DeficitCovered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "debtAsset",
      "type": "address"
    }, { "indexed": false, "internalType": "uint256", "name": "amountCreated", "type": "uint256" }],
    "name": "DeficitCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "target", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "initiator", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "asset", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      {
        "indexed": false,
        "internalType": "enum DataTypes.InterestRateMode",
        "name": "interestRateMode",
        "type": "uint8"
      },
      { "indexed": false, "internalType": "uint256", "name": "premium", "type": "uint256" },
      { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "FlashLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "asset", "type": "address" }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "totalDebt",
      "type": "uint256"
    }],
    "name": "IsolationModeTotalDebtUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "collateralAsset", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "debtAsset", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "debtToCover", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "liquidatedCollateralAmount", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "liquidator", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "receiveAToken", "type": "bool" }
    ],
    "name": "LiquidationCall",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amountMinted",
      "type": "uint256"
    }],
    "name": "MintedToTreasury",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "positionManager",
      "type": "address"
    }],
    "name": "PositionManagerApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "positionManager",
      "type": "address"
    }],
    "name": "PositionManagerRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "repayer", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "bool", "name": "useATokens", "type": "bool" }
    ],
    "name": "Repay",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "liquidityRate", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "stableBorrowRate", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "variableBorrowRate", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "liquidityIndex", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "variableBorrowIndex", "type": "uint256" }
    ],
    "name": "ReserveDataUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }],
    "name": "ReserveUsedAsCollateralDisabled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "reserve", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }],
    "name": "ReserveUsedAsCollateralEnabled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": true, "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "Supply",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, {
      "indexed": false,
      "internalType": "uint8",
      "name": "categoryId",
      "type": "uint8"
    }],
    "name": "UserEModeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "reserve", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADDRESSES_PROVIDER",
    "outputs": [{ "internalType": "contract IPoolAddressesProvider", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TOTAL",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "FLASHLOAN_PREMIUM_TO_PROTOCOL",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_NUMBER_RESERVES",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "POOL_REVISION",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "RESERVE_INTEREST_RATE_STRATEGY",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UMBRELLA",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "positionManager", "type": "address" }, {
      "internalType": "bool",
      "name": "approve",
      "type": "bool"
    }],
    "name": "approvePositionManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" }
    ],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }, {
      "components": [
        { "internalType": "uint16", "name": "ltv", "type": "uint16" },
        { "internalType": "uint16", "name": "liquidationThreshold", "type": "uint16" },
        { "internalType": "uint16", "name": "liquidationBonus", "type": "uint16" },
        { "internalType": "string", "name": "label", "type": "string" }
      ],
      "internalType": "struct DataTypes.EModeCategoryBaseConfiguration",
      "name": "category",
      "type": "tuple"
    }],
    "name": "configureEModeCategory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }, {
      "internalType": "uint128",
      "name": "borrowableBitmap",
      "type": "uint128"
    }],
    "name": "configureEModeCategoryBorrowableBitmap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }, {
      "internalType": "uint128",
      "name": "collateralBitmap",
      "type": "uint128"
    }],
    "name": "configureEModeCategoryCollateralBitmap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "dropReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }],
    "name": "eliminateReserveDeficit",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "scaledAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "scaledBalanceFromBefore", "type": "uint256" },
      { "internalType": "uint256", "name": "scaledBalanceToBefore", "type": "uint256" }
    ],
    "name": "finalizeTransfer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiverAddress", "type": "address" },
      { "internalType": "address[]", "name": "assets", "type": "address[]" },
      { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" },
      { "internalType": "uint256[]", "name": "interestRateModes", "type": "uint256[]" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "internalType": "bytes", "name": "params", "type": "bytes" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "flashLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiverAddress", "type": "address" },
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "bytes", "name": "params", "type": "bytes" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "flashLoanSimple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBorrowLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getConfiguration",
    "outputs": [{
      "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
      "internalType": "struct DataTypes.ReserveConfigurationMap",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }],
    "name": "getEModeCategoryBorrowableBitmap",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }],
    "name": "getEModeCategoryCollateralBitmap",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }],
    "name": "getEModeCategoryCollateralConfig",
    "outputs": [{
      "components": [{ "internalType": "uint16", "name": "ltv", "type": "uint16" }, {
        "internalType": "uint16",
        "name": "liquidationThreshold",
        "type": "uint16"
      }, { "internalType": "uint16", "name": "liquidationBonus", "type": "uint16" }],
      "internalType": "struct DataTypes.CollateralConfig",
      "name": "res",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }],
    "name": "getEModeCategoryData",
    "outputs": [{
      "components": [
        { "internalType": "uint16", "name": "ltv", "type": "uint16" },
        { "internalType": "uint16", "name": "liquidationThreshold", "type": "uint16" },
        { "internalType": "uint16", "name": "liquidationBonus", "type": "uint16" },
        { "internalType": "address", "name": "priceSource", "type": "address" },
        { "internalType": "string", "name": "label", "type": "string" }
      ],
      "internalType": "struct DataTypes.EModeCategoryLegacy",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "id", "type": "uint8" }],
    "name": "getEModeCategoryLabel",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEModeLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFlashLoanLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getLiquidationGracePeriod",
    "outputs": [{ "internalType": "uint40", "name": "", "type": "uint40" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLiquidationLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPoolLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveAToken",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "id", "type": "uint16" }],
    "name": "getReserveAddressById",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveData",
    "outputs": [{
      "components": [
        {
          "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
          "internalType": "struct DataTypes.ReserveConfigurationMap",
          "name": "configuration",
          "type": "tuple"
        },
        { "internalType": "uint128", "name": "liquidityIndex", "type": "uint128" },
        { "internalType": "uint128", "name": "currentLiquidityRate", "type": "uint128" },
        { "internalType": "uint128", "name": "variableBorrowIndex", "type": "uint128" },
        { "internalType": "uint128", "name": "currentVariableBorrowRate", "type": "uint128" },
        { "internalType": "uint128", "name": "currentStableBorrowRate", "type": "uint128" },
        { "internalType": "uint40", "name": "lastUpdateTimestamp", "type": "uint40" },
        { "internalType": "uint16", "name": "id", "type": "uint16" },
        { "internalType": "address", "name": "aTokenAddress", "type": "address" },
        { "internalType": "address", "name": "stableDebtTokenAddress", "type": "address" },
        { "internalType": "address", "name": "variableDebtTokenAddress", "type": "address" },
        { "internalType": "address", "name": "interestRateStrategyAddress", "type": "address" },
        { "internalType": "uint128", "name": "accruedToTreasury", "type": "uint128" },
        { "internalType": "uint128", "name": "unbacked", "type": "uint128" },
        { "internalType": "uint128", "name": "isolationModeTotalDebt", "type": "uint128" }
      ],
      "internalType": "struct DataTypes.ReserveDataLegacy",
      "name": "res",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveDeficit",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveNormalizedIncome",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveNormalizedVariableDebt",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getReserveVariableDebtToken",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReservesCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReservesList",
    "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSupplyLogic",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserAccountData",
    "outputs": [
      { "internalType": "uint256", "name": "totalCollateralBase", "type": "uint256" },
      { "internalType": "uint256", "name": "totalDebtBase", "type": "uint256" },
      { "internalType": "uint256", "name": "availableBorrowsBase", "type": "uint256" },
      { "internalType": "uint256", "name": "currentLiquidationThreshold", "type": "uint256" },
      { "internalType": "uint256", "name": "ltv", "type": "uint256" },
      { "internalType": "uint256", "name": "healthFactor", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserConfiguration",
    "outputs": [{
      "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
      "internalType": "struct DataTypes.UserConfigurationMap",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getUserEMode",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "getVirtualUnderlyingBalance",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "address",
      "name": "aTokenAddress",
      "type": "address"
    }, { "internalType": "address", "name": "variableDebtAddress", "type": "address" }],
    "name": "initReserve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "contract IPoolAddressesProvider", "name": "provider", "type": "address" }],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, {
      "internalType": "address",
      "name": "positionManager",
      "type": "address"
    }],
    "name": "isApprovedPositionManager",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "collateralAsset", "type": "address" },
      { "internalType": "address", "name": "debtAsset", "type": "address" },
      { "internalType": "address", "name": "borrower", "type": "address" },
      { "internalType": "uint256", "name": "debtToCover", "type": "uint256" },
      { "internalType": "bool", "name": "receiveAToken", "type": "bool" }
    ],
    "name": "liquidationCall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address[]", "name": "assets", "type": "address[]" }],
    "name": "mintToTreasury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }],
    "name": "multicall",
    "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "renouncePositionManagerRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" }
    ],
    "name": "repay",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }, { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" }],
    "name": "repayWithATokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRateMode", "type": "uint256" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint8", "name": "permitV", "type": "uint8" },
      { "internalType": "bytes32", "name": "permitR", "type": "bytes32" },
      { "internalType": "bytes32", "name": "permitS", "type": "bytes32" }
    ],
    "name": "repayWithPermit",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "rescueTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "resetIsolationModeTotalDebt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "components": [{ "internalType": "uint256", "name": "data", "type": "uint256" }],
      "internalType": "struct DataTypes.ReserveConfigurationMap",
      "name": "configuration",
      "type": "tuple"
    }],
    "name": "setConfiguration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "uint40",
      "name": "until",
      "type": "uint40"
    }],
    "name": "setLiquidationGracePeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "categoryId", "type": "uint8" }],
    "name": "setUserEMode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8", "name": "categoryId", "type": "uint8" }, {
      "internalType": "address",
      "name": "onBehalfOf",
      "type": "address"
    }],
    "name": "setUserEModeOnBehalfOf",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "bool",
      "name": "useAsCollateral",
      "type": "bool"
    }],
    "name": "setUserUseReserveAsCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "bool",
      "name": "useAsCollateral",
      "type": "bool"
    }, { "internalType": "address", "name": "onBehalfOf", "type": "address" }],
    "name": "setUserUseReserveAsCollateralOnBehalfOf",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" }
    ],
    "name": "supply",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "asset", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "address", "name": "onBehalfOf", "type": "address" },
      { "internalType": "uint16", "name": "referralCode", "type": "uint16" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint8", "name": "permitV", "type": "uint8" },
      { "internalType": "bytes32", "name": "permitR", "type": "bytes32" },
      { "internalType": "bytes32", "name": "permitS", "type": "bytes32" }
    ],
    "name": "supplyWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "syncIndexesState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }],
    "name": "syncRatesState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint128", "name": "flashLoanPremium", "type": "uint128" }],
    "name": "updateFlashloanPremium",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "asset", "type": "address" }, {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }, { "internalType": "address", "name": "to", "type": "address" }],
    "name": "withdraw",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const LOCKUP_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "initialAdmin", "type": "address" }, {
      "internalType": "contract ILockupNFTDescriptor",
      "name": "initialNFTDescriptor",
      "type": "address"
    }, { "internalType": "uint256", "name": "maxCount", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "address", "name": "target", "type": "address" }],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "AddressInsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "admin", "type": "address" }, {
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }],
    "name": "CallerNotAdmin",
    "type": "error"
  },
  { "inputs": [], "name": "DelegateCall", "type": "error" },
  {
    "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, { "internalType": "address", "name": "owner", "type": "address" }],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  { "inputs": [], "name": "FailedInnerCall", "type": "error" },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "SablierLockupBase_AllowToHookUnsupportedInterface",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "SablierLockupBase_AllowToHookZeroCodeSize",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "admin", "type": "address" }, {
      "internalType": "uint256",
      "name": "feeAmount",
      "type": "uint256"
    }],
    "name": "SablierLockupBase_FeeTransferFail",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "SablierLockupBase_InvalidHookSelector",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "SablierLockupBase_NotTransferable",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_Null",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "uint128",
      "name": "amount",
      "type": "uint128"
    }, { "internalType": "uint128", "name": "withdrawableAmount", "type": "uint128" }],
    "name": "SablierLockupBase_Overdraw",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_StreamCanceled",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_StreamDepleted",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_StreamNotCancelable",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_StreamNotDepleted",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_StreamSettled",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }],
    "name": "SablierLockupBase_Unauthorized",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_WithdrawAmountZero",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamIdsCount", "type": "uint256" }, {
      "internalType": "uint256",
      "name": "amountsCount",
      "type": "uint256"
    }],
    "name": "SablierLockupBase_WithdrawArrayCountsNotEqual",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "SablierLockupBase_WithdrawToZeroAddress",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "address",
      "name": "caller",
      "type": "address"
    }, { "internalType": "address", "name": "to", "type": "address" }],
    "name": "SablierLockupBase_WithdrawalAddressNotRecipient",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "enum Lockup.Model", "name": "actualLockupModel", "type": "uint8" }, {
      "internalType": "enum Lockup.Model",
      "name": "expectedLockupModel",
      "type": "uint8"
    }],
    "name": "SablierLockup_NotExpectedModel",
    "type": "error"
  },
  {
    "inputs": [{ "internalType": "address", "name": "token", "type": "address" }],
    "name": "SafeERC20FailedOperation",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "admin", "type": "address" }, {
      "indexed": false,
      "internalType": "address",
      "name": "recipient",
      "type": "address"
    }],
    "name": "AllowToHook",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "approved",
      "type": "address"
    }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_fromTokenId", "type": "uint256" }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "_toTokenId",
      "type": "uint256"
    }],
    "name": "BatchMetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "streamId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" },
      { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" },
      { "indexed": false, "internalType": "uint128", "name": "senderAmount", "type": "uint128" },
      { "indexed": false, "internalType": "uint128", "name": "recipientAmount", "type": "uint128" }
    ],
    "name": "CancelLockupStream",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "admin", "type": "address" }, {
      "indexed": true,
      "internalType": "uint256",
      "name": "feeAmount",
      "type": "uint256"
    }],
    "name": "CollectFees",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "components": [
        { "internalType": "address", "name": "funder", "type": "address" },
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        {
          "components": [{ "internalType": "uint128", "name": "deposit", "type": "uint128" }, {
            "internalType": "uint128",
            "name": "brokerFee",
            "type": "uint128"
          }],
          "internalType": "struct Lockup.CreateAmounts",
          "name": "amounts",
          "type": "tuple"
        },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        {
          "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
            "internalType": "uint40",
            "name": "end",
            "type": "uint40"
          }],
          "internalType": "struct Lockup.Timestamps",
          "name": "timestamps",
          "type": "tuple"
        },
        { "internalType": "string", "name": "shape", "type": "string" },
        { "internalType": "address", "name": "broker", "type": "address" }
      ],
      "indexed": false,
      "internalType": "struct Lockup.CreateEventCommon",
      "name": "commonParams",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "UD2x18",
        "name": "exponent",
        "type": "uint64"
      }, { "internalType": "uint40", "name": "timestamp", "type": "uint40" }],
      "indexed": false,
      "internalType": "struct LockupDynamic.Segment[]",
      "name": "segments",
      "type": "tuple[]"
    }],
    "name": "CreateLockupDynamicStream",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "streamId", "type": "uint256" },
      {
        "components": [
          { "internalType": "address", "name": "funder", "type": "address" },
          { "internalType": "address", "name": "sender", "type": "address" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          {
            "components": [{ "internalType": "uint128", "name": "deposit", "type": "uint128" }, {
              "internalType": "uint128",
              "name": "brokerFee",
              "type": "uint128"
            }],
            "internalType": "struct Lockup.CreateAmounts",
            "name": "amounts",
            "type": "tuple"
          },
          { "internalType": "contract IERC20", "name": "token", "type": "address" },
          { "internalType": "bool", "name": "cancelable", "type": "bool" },
          { "internalType": "bool", "name": "transferable", "type": "bool" },
          {
            "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
              "internalType": "uint40",
              "name": "end",
              "type": "uint40"
            }],
            "internalType": "struct Lockup.Timestamps",
            "name": "timestamps",
            "type": "tuple"
          },
          { "internalType": "string", "name": "shape", "type": "string" },
          { "internalType": "address", "name": "broker", "type": "address" }
        ],
        "indexed": false,
        "internalType": "struct Lockup.CreateEventCommon",
        "name": "commonParams",
        "type": "tuple"
      },
      { "indexed": false, "internalType": "uint40", "name": "cliffTime", "type": "uint40" },
      {
        "components": [{ "internalType": "uint128", "name": "start", "type": "uint128" }, {
          "internalType": "uint128",
          "name": "cliff",
          "type": "uint128"
        }],
        "indexed": false,
        "internalType": "struct LockupLinear.UnlockAmounts",
        "name": "unlockAmounts",
        "type": "tuple"
      }
    ],
    "name": "CreateLockupLinearStream",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "components": [
        { "internalType": "address", "name": "funder", "type": "address" },
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        {
          "components": [{ "internalType": "uint128", "name": "deposit", "type": "uint128" }, {
            "internalType": "uint128",
            "name": "brokerFee",
            "type": "uint128"
          }],
          "internalType": "struct Lockup.CreateAmounts",
          "name": "amounts",
          "type": "tuple"
        },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        {
          "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
            "internalType": "uint40",
            "name": "end",
            "type": "uint40"
          }],
          "internalType": "struct Lockup.Timestamps",
          "name": "timestamps",
          "type": "tuple"
        },
        { "internalType": "string", "name": "shape", "type": "string" },
        { "internalType": "address", "name": "broker", "type": "address" }
      ],
      "indexed": false,
      "internalType": "struct Lockup.CreateEventCommon",
      "name": "commonParams",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "uint40",
        "name": "timestamp",
        "type": "uint40"
      }],
      "indexed": false,
      "internalType": "struct LockupTranched.Tranche[]",
      "name": "tranches",
      "type": "tuple[]"
    }],
    "name": "CreateLockupTranchedStream",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "indexed": false,
      "internalType": "bytes",
      "name": "revertData",
      "type": "bytes"
    }],
    "name": "InvalidWithdrawalInWithdrawMultiple",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "internalType": "uint256", "name": "_tokenId", "type": "uint256" }],
    "name": "MetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "RenounceLockupStream",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "admin", "type": "address" }, {
      "indexed": false,
      "internalType": "contract ILockupNFTDescriptor",
      "name": "oldNFTDescriptor",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "contract ILockupNFTDescriptor",
      "name": "newNFTDescriptor",
      "type": "address"
    }],
    "name": "SetNFTDescriptor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "oldAdmin", "type": "address" }, {
      "indexed": true,
      "internalType": "address",
      "name": "newAdmin",
      "type": "address"
    }],
    "name": "TransferAdmin",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "streamId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
      { "indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address" },
      { "indexed": false, "internalType": "uint128", "name": "amount", "type": "uint128" }
    ],
    "name": "WithdrawFromLockupStream",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_BROKER_FEE",
    "outputs": [{ "internalType": "UD60x18", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_COUNT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "allowToHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes[]", "name": "calls", "type": "bytes[]" }],
    "name": "batch",
    "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "burn",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "cancel",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256[]", "name": "streamIds", "type": "uint256[]" }],
    "name": "cancelMultiple",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  { "inputs": [], "name": "collectFees", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithDurations",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "UD2x18",
        "name": "exponent",
        "type": "uint64"
      }, { "internalType": "uint40", "name": "duration", "type": "uint40" }],
      "internalType": "struct LockupDynamic.SegmentWithDuration[]",
      "name": "segmentsWithDuration",
      "type": "tuple[]"
    }],
    "name": "createWithDurationsLD",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithDurations",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "start", "type": "uint128" }, {
        "internalType": "uint128",
        "name": "cliff",
        "type": "uint128"
      }],
      "internalType": "struct LockupLinear.UnlockAmounts",
      "name": "unlockAmounts",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint40", "name": "cliff", "type": "uint40" }, {
        "internalType": "uint40",
        "name": "total",
        "type": "uint40"
      }],
      "internalType": "struct LockupLinear.Durations",
      "name": "durations",
      "type": "tuple"
    }],
    "name": "createWithDurationsLL",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithDurations",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "uint40",
        "name": "duration",
        "type": "uint40"
      }],
      "internalType": "struct LockupTranched.TrancheWithDuration[]",
      "name": "tranchesWithDuration",
      "type": "tuple[]"
    }],
    "name": "createWithDurationsLT",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        {
          "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
            "internalType": "uint40",
            "name": "end",
            "type": "uint40"
          }],
          "internalType": "struct Lockup.Timestamps",
          "name": "timestamps",
          "type": "tuple"
        },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithTimestamps",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "UD2x18",
        "name": "exponent",
        "type": "uint64"
      }, { "internalType": "uint40", "name": "timestamp", "type": "uint40" }],
      "internalType": "struct LockupDynamic.Segment[]",
      "name": "segments",
      "type": "tuple[]"
    }],
    "name": "createWithTimestampsLD",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        {
          "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
            "internalType": "uint40",
            "name": "end",
            "type": "uint40"
          }],
          "internalType": "struct Lockup.Timestamps",
          "name": "timestamps",
          "type": "tuple"
        },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithTimestamps",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "start", "type": "uint128" }, {
        "internalType": "uint128",
        "name": "cliff",
        "type": "uint128"
      }],
      "internalType": "struct LockupLinear.UnlockAmounts",
      "name": "unlockAmounts",
      "type": "tuple"
    }, { "internalType": "uint40", "name": "cliffTime", "type": "uint40" }],
    "name": "createWithTimestampsLL",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [
        { "internalType": "address", "name": "sender", "type": "address" },
        { "internalType": "address", "name": "recipient", "type": "address" },
        { "internalType": "uint128", "name": "totalAmount", "type": "uint128" },
        { "internalType": "contract IERC20", "name": "token", "type": "address" },
        { "internalType": "bool", "name": "cancelable", "type": "bool" },
        { "internalType": "bool", "name": "transferable", "type": "bool" },
        {
          "components": [{ "internalType": "uint40", "name": "start", "type": "uint40" }, {
            "internalType": "uint40",
            "name": "end",
            "type": "uint40"
          }],
          "internalType": "struct Lockup.Timestamps",
          "name": "timestamps",
          "type": "tuple"
        },
        { "internalType": "string", "name": "shape", "type": "string" },
        {
          "components": [{ "internalType": "address", "name": "account", "type": "address" }, {
            "internalType": "UD60x18",
            "name": "fee",
            "type": "uint256"
          }],
          "internalType": "struct Broker",
          "name": "broker",
          "type": "tuple"
        }
      ],
      "internalType": "struct Lockup.CreateWithTimestamps",
      "name": "params",
      "type": "tuple"
    }, {
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "uint40",
        "name": "timestamp",
        "type": "uint40"
      }],
      "internalType": "struct LockupTranched.Tranche[]",
      "name": "tranches",
      "type": "tuple[]"
    }],
    "name": "createWithTimestampsLT",
    "outputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "getApproved",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getCliffTime",
    "outputs": [{ "internalType": "uint40", "name": "cliffTime", "type": "uint40" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getDepositedAmount",
    "outputs": [{ "internalType": "uint128", "name": "depositedAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getEndTime",
    "outputs": [{ "internalType": "uint40", "name": "endTime", "type": "uint40" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getLockupModel",
    "outputs": [{ "internalType": "enum Lockup.Model", "name": "lockupModel", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getRecipient",
    "outputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getRefundedAmount",
    "outputs": [{ "internalType": "uint128", "name": "refundedAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getSegments",
    "outputs": [{
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "UD2x18",
        "name": "exponent",
        "type": "uint64"
      }, { "internalType": "uint40", "name": "timestamp", "type": "uint40" }],
      "internalType": "struct LockupDynamic.Segment[]",
      "name": "segments",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getSender",
    "outputs": [{ "internalType": "address", "name": "sender", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getStartTime",
    "outputs": [{ "internalType": "uint40", "name": "startTime", "type": "uint40" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getTranches",
    "outputs": [{
      "components": [{ "internalType": "uint128", "name": "amount", "type": "uint128" }, {
        "internalType": "uint40",
        "name": "timestamp",
        "type": "uint40"
      }],
      "internalType": "struct LockupTranched.Tranche[]",
      "name": "tranches",
      "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getUnderlyingToken",
    "outputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getUnlockAmounts",
    "outputs": [{
      "components": [{ "internalType": "uint128", "name": "start", "type": "uint128" }, {
        "internalType": "uint128",
        "name": "cliff",
        "type": "uint128"
      }],
      "internalType": "struct LockupLinear.UnlockAmounts",
      "name": "unlockAmounts",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "getWithdrawnAmount",
    "outputs": [{ "internalType": "uint128", "name": "withdrawnAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }],
    "name": "isAllowedToHook",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isCancelable",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isCold",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isDepleted",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isStream",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isTransferable",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "isWarm",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextStreamId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nftDescriptor",
    "outputs": [{ "internalType": "contract ILockupNFTDescriptor", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "refundableAmountOf",
    "outputs": [{ "internalType": "uint128", "name": "refundableAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "renounce",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256[]", "name": "streamIds", "type": "uint256[]" }],
    "name": "renounceMultiple",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "contract ILockupNFTDescriptor", "name": "newNFTDescriptor", "type": "address" }],
    "name": "setNFTDescriptor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "statusOf",
    "outputs": [{ "internalType": "enum Lockup.Status", "name": "status", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "streamedAmountOf",
    "outputs": [{ "internalType": "uint128", "name": "streamedAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }],
    "name": "supportsInterface",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "uri", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newAdmin", "type": "address" }],
    "name": "transferAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "wasCanceled",
    "outputs": [{ "internalType": "bool", "name": "result", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, { "internalType": "uint128", "name": "amount", "type": "uint128" }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }],
    "name": "withdrawMax",
    "outputs": [{ "internalType": "uint128", "name": "withdrawnAmount", "type": "uint128" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }, {
      "internalType": "address",
      "name": "newRecipient",
      "type": "address"
    }],
    "name": "withdrawMaxAndTransfer",
    "outputs": [{ "internalType": "uint128", "name": "withdrawnAmount", "type": "uint128" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256[]", "name": "streamIds", "type": "uint256[]" }, {
      "internalType": "uint128[]",
      "name": "amounts",
      "type": "uint128[]"
    }],
    "name": "withdrawMultiple",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "streamId", "type": "uint256" }],
    "name": "withdrawableAmountOf",
    "outputs": [{ "internalType": "uint128", "name": "withdrawableAmount", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const
