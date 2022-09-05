import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../typing";
import { urlFor } from "../sanity";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "../app/store";
import { removeFromCart, changeQuantity } from "../slices/cartSlice";
import toast from "react-hot-toast";
import CurrencyFormat from "react-currency-format";

interface Props {
  item: Product;
}

const CartProduct = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemoveItemCart = () => {
    dispatch(removeFromCart({ id: item._id }));

    toast.success("Remove success!", {
      position: "top-right",
    });
  };

  const handleChangeQuantityItemCart = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      changeQuantity({ _id: item._id, quantity: Number(e.target.value) })
    );
  };

  return (
    <div className="flex w-full flex-col sm:flex-row sm:items-center">
      <div className="relative mb-4 h-44 w-44">
        <Image
          src={urlFor(item.image[0]).url()}
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex grow flex-col space-y-2">
        <h2 className="text-lg font-semibold first-letter:uppercase">
          {item.title}
        </h2>

        <div className="flex justify-between">
          <select
            className="block w-32 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChangeQuantityItemCart}
          >
            {[...Array.from({ length: 10 }, (_, i) => i + 1)].map((qty) => (
              <option key={qty} value={qty} selected={item.quantity === qty}>
                {qty}
              </option>
            ))}
          </select>

          <span className="font-semibold">
            <CurrencyFormat
              value={
                !item.quantity ? 1 * item.price : item.quantity * item.price
              }
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
        </div>

        <div className="flex justify-between text-sm font-semibold text-blue-500">
          <div className="flex cursor-pointer items-center space-x-1 hover:underline">
            <span>Show product details</span>
            <ChevronDownIcon className="h-4" />
          </div>
          <p className="cursor-pointer" onClick={handleRemoveItemCart}>
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
