// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { Factory } from "src/factory/Factory.sol";
import { console } from "forge-std/src/console.sol";

contract Deploy is BaseScript {
    Factory public factory;

    Factory.FreePeriod public freePeriod = Factory.FreePeriod({ start: 0, end: 1_708_088_400 });

    function run() public broadcast {
        // Polygon = 30e18 MATIC
        // BNB = 0.1e18 BNB
        // LINEA & ARBITRUM = 0.01e18 ETH
        new Factory(0x5B3B2c5dfCAfeB4bf46Cfc3141e36E793f4C6fcd, 0.01e18, broadcaster, freePeriod);
    }
}
