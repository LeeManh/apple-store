import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Product } from "../typing";
import { urlFor } from "../sanity";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "../app/store";
import { addToCart, selectCartItems } from "../slices/cartSlice";
import { useSelector } from "react-redux";

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAddCart = () => {
    const isItemAlreadyInCart = cartItems.some(
      (item) => item._id === product._id
    );
    if (isItemAlreadyInCart) {
      toast.error(
        `${
          product.title.slice(0, 1).toUpperCase() + product.title.slice(1)
        } already exist in cart`,
        {
          duration: 2000,
          position: "top-right",
        }
      );

      return;
    }

    toast.success(`Add ${product.title} success`, {
      position: "top-right",
    });
    dispatch(addToCart(product));
  };

  return (
    <div className=" flex h-fit w-[320px] flex-col space-y-4 rounded-xl bg-[#37383c] p-8 text-white">
      <div className="md:w[280px] relative mx-auto h-[200px] w-[200px] md:h-[280px] ">
        <Image
          src={urlFor(product.image[0]).url()}
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="text-md flex flex-col space-y-2 md:text-lg">
          <span className="capitalize">{product.title}</span>
          <span className="font-semibold tracking-wide">${product.price}</span>
        </div>
        <button
          className="cusor-poiter gradient-bg flex h-[50px] w-[50px] items-center justify-center rounded-full"
          onClick={handleAddCart}
        >
          <ShoppingBagIcon className="h-6 w-6 text-white shadow-md" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
