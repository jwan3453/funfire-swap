// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    // ISwapRouter public  swapRouter =
    //     ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    ISwapRouter public  swapRouter =
        ISwapRouter(0xD6601e25cF43CAc433A23cB95a39D38012B2e9f0);
    function swapExactInputSingle(address token1, address token2, uint amountIn)
        external
        returns (uint amountOut)
    {
        TransferHelper.safeTransferFrom(
            token1,
            msg.sender,
            address(this),
            amountIn
        );
        // swapRouter =
        // ISwapRouter(swapRouterAddress);
        TransferHelper.safeApprove(token1, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
        .ExactInputSingleParams({
            tokenIn: token1,
            tokenOut: token2,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
        amountOut = swapRouter.exactInputSingle(params);
    }

    function swapExactOutputSingle(address token1, address token2,uint amountOut, uint amountInMaximum)
        external
        returns (uint amountIn)
    {
        TransferHelper.safeTransferFrom(
            token1,
            msg.sender,
            address(this),
            amountInMaximum
        );
        TransferHelper.safeApprove(token1, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: token1,
                tokenOut: token2,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        amountIn = swapRouter.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(token1, address(swapRouter), 0);
            TransferHelper.safeTransfer(
                token1,
                msg.sender,
                amountInMaximum - amountIn
            );
        }
    }
}