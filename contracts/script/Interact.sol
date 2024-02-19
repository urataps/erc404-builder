// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { Factory } from "src/factory/Factory.sol";
import { console } from "forge-std/src/console.sol";

contract Interact is BaseScript {
    Factory public factory = Factory(0xb747e0671BF4531a01a9640C4Ad56805cD916e61);

    Factory.FreePeriod public freePeriod = Factory.FreePeriod({ start: 0, end: 1_708_088_400 });

    function run() public broadcast {
        factory.setDeploymentFee(0.001e18);
    }
}
