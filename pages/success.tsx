import React, { useState } from "react";
import {
  CheckCircleIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import type { StripeProduct } from "../typing";
import { fetchLineItems } from "../utils/fetchLineItems";
import CurrencyFormat from "react-currency-format";
import Head from "next/head";

interface Props {
  products: StripeProduct[];
}

const Success = ({ products }: Props) => {
  const router = useRouter();
  const { session_id } = router.query;

  const [isOpenSummary, setIsOpenSummary] = useState(false);

  const subtotal = products.reduce((sum, product) => {
    return sum + product.price.unit_amount / 100;
  }, 0);

  return (
    <div>
      <Head>
        <title>Thank you | Apple</title>
      </Head>

      <div className="mx-auto flex max-w-screen-xl p-10 md:space-x-8">
        {/* Right */}
        <div className="mx-auto w-full space-y-8 md:w-1/2">
          {/* Summary start */}
          <div className="md:hidden">
            {/* Header summary */}
            <div className="flex items-center justify-between border-y border-gray-300  py-6 font-semibold">
              <div
                className="flex cursor-pointer items-center space-x-2 "
                onClick={() => setIsOpenSummary((pre) => !pre)}
              >
                <ShoppingCartIcon className="h-5" />
                <p className="text-sm">Show order summary</p>

                {isOpenSummary ? (
                  <ChevronUpIcon className="h-5" />
                ) : (
                  <ChevronDownIcon className="h-5" />
                )}
              </div>

              <p className="text-xl">
                <CurrencyFormat
                  value={subtotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
            </div>

            {/* Content summary */}
            {isOpenSummary && (
              <div className="space-y-4 divide-y">
                <div className="mt-4 flex flex-col space-y-4 ">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded border border-gray-300 bg-[#e6ebee]">
                            <PhotoIcon className="h-5 w-5 animate-bounce " />
                            <div className="absolute -top-2 -right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full border-none bg-gray-500 text-xs font-semibold text-white">
                              {product.quantity}
                            </div>
                          </div>
                        </div>

                        <span className="text-sm font-semibold first-letter:uppercase">
                          {product.description}
                        </span>
                      </div>

                      <p className="font-semibold">
                        <CurrencyFormat
                          value={
                            (product.price.unit_amount / 100) * product.quantity
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4 ">
                  <span className="text-sm font-semibold">Subtotal</span>
                  <div className="text-xl font-semibold">
                    <CurrencyFormat
                      value={subtotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Summary end */}

          <div className="flex space-x-4 ">
            <CheckCircleIcon className="h-12  text-green-600" />
            <div>
              <p className="text-sm">Order #{session_id?.slice(-5)}</p>
              <p className="text-lg font-semibold">Thank You </p>
            </div>
          </div>

          <div className="space-y-4 divide-y rounded-md border border-gray-300 p-4">
            <div>
              <p className="font-semibold">Your order is confirmed</p>
              <p className="text-sm">
                We’ve accepted your order, and we’re getting it ready. Come back
                to this page for updates on your shipment status.
              </p>
            </div>
            <div className="pt-4">
              <p className="font-semibold">Other tracking number</p>
              <p className="text-sm">312312321</p>
            </div>
          </div>

          <div className="space-y-4 divide-y rounded-md border border-gray-300 p-4">
            <p className="font-semibold">Other updates</p>
            <p className="pt-4 text-sm">
              You will get shipping and delivery updates by email and texy
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:items-center md:justify-between lg:flex-row">
            <div className="space-x-2 text-sm font-semibold">
              <span> Need helps ?</span>
              <span className="cursor-pointer text-blue-400 hover:underline">
                Contact us
              </span>
            </div>

            <button className="button" onClick={() => router.push("/")}>
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Left  */}
        <div className="hidden w-1/2 md:block">
          <div className="space-y-4 divide-y">
            <div className="mt-4 flex flex-col space-y-4 ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded border border-gray-300 bg-[#e6ebee]">
                        <PhotoIcon className="h-5 w-5 animate-bounce " />
                        <div className="absolute -top-2 -right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full border-none bg-gray-500 text-xs font-semibold text-white">
                          {product.quantity}
                        </div>
                      </div>
                    </div>

                    <span className="text-sm font-semibold first-letter:uppercase">
                      {product.description}
                    </span>
                  </div>

                  <p className="font-semibold">
                    <CurrencyFormat
                      value={
                        (product.price.unit_amount / 100) * product.quantity
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 ">
              <span className="text-sm font-semibold">Subtotal</span>
              <div className="text-xl font-semibold">
                <CurrencyFormat
                  value={subtotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const sessionId = context.query.session_id as string;

  const products = await fetchLineItems(sessionId);

  return {
    props: {
      products,
    },
  };
};
