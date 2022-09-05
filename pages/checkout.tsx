import Head from "next/head";
import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice } from "../slices/cartSlice";
import Link from "next/link";
import CartProduct from "../components/CartProduct";
import CurrencyFormat from "react-currency-format";
import { BoltIcon } from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);

    // Create Checkout Sessions from body params.
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout-sessions",
      {
        items: cartItems,
      }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Check out | Apple</title>
      </Head>

      <Header />
      <main>
        <div className="wrapper py-10">
          <h1 className="mx-auto mb-10  text-center text-2xl font-semibold">
            {cartItems.length > 0
              ? "Review your bag ✨"
              : "Your cart is empty 🛒"}
          </h1>

          {!cartItems.length && (
            <div className="mt-10 text-center">
              <Link href="/">
                <button className="button">Back to home</button>
              </Link>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mx-auto flex flex-col space-y-4 divide-y sm:w-[500px]">
              {cartItems.map((item) => (
                <CartProduct key={item._id} item={item} />
              ))}

              <div className=" pt-2 text-lg font-semibold">
                <div className="flex items-center justify-between">
                  <h2 className=" first-letter:uppercase">Total</h2>
                  <CurrencyFormat
                    value={totalPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>

                <div className="flex flex-col items-center ">
                  <p className="mt-10">How would you like to check out?</p>

                  <button
                    className="button mt-4 flex w-full items-center text-sm sm:w-fit"
                    onClick={createCheckoutSession}
                  >
                    <BoltIcon className="mr-2 h-5" />
                    Check out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
