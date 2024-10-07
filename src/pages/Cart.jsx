import { useEffect } from "react";
import * as AntDesign from "antd";
import { Product } from "../components";
import { cartApi } from "../api/endpoints";

export default function Cart() {
  const { data: cartData, isLoading: cartIsLoading } =
    cartApi.useGetCartsQuery();

  useEffect(() => {
    console.log(cartData?.data?.carts);
  }, [cartData]);

  return (
    <div className="min-h-dvh flex flex-col gap-[4dvh] px-4 py-[18dvh] transition-all duration-400 justify-center items-center md:items-start text-center text-black bg-gray-50 md:px-20 overflow-hidden">
      <div className="flex flex-col gap-2 justify-start items-center md:items-start">
        <h1 className="font-bold text-xl">Shopping Bag</h1>
        <h1>
          <span className="font-bold text-base">
            {cartData?.data?.carts.length} items
          </span>{" "}
          in your Bag
        </h1>
      </div>
      <div className="w-full flex gap-[4dvh] flex-col justify-between place-items-center items-center lg:items-start lg:flex-row">
        {cartIsLoading ? (
          <div className="w-full h-[20rem] flex justify-center items-center">
            <AntDesign.Spin size="large" />
          </div>
        ) : (
          <>
            {cartData?.data?.carts && cartData?.data?.carts.length > 0 && (
              <div className="flex flex-col">
                {cartData.data.carts.map((product, index, arr) => {
                  return (
                    <div key={index}>
                      <Product product={product} />
                      {index < arr.length - 1 && <AntDesign.Divider />}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="h-full w-full flex flex-col gap-2 justify-center items-center  lg:items-end">
          <div
            className="flex flex-col gap-4 p-6 justify-between items-start text-start"
            style={{ boxShadow: "0px 0px 12px -8px" }}
          >
            <div className="w-full flex flex-row justify-between gap-32">
              <h1>Shipping Cost</h1>
              <h1>$0/-</h1>
            </div>
            <div className="w-full flex flex-row justify-between gap-32">
              <h1>GST</h1>
              <h1>$0/-</h1>
            </div>
            <div className="w-full flex flex-row justify-between gap-32 font-bold text-lg">
              <h1>Cart Total</h1>
              <h1>$50/-</h1>
            </div>
            <AntDesign.Divider className="m-0" />
            <div className="w-full flex flex-col justify-center items-center">
              <AntDesign.Button type="primary" className="px-8 py-5">
                Checkout
              </AntDesign.Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
