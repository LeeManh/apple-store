import type { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Landing from "../components/Landing";

import type { Category, Product } from "../typing";
import { fecthCategories } from "../utils/fetchCategories";
import { Tab } from "@headlessui/react";
import { fetchProducts } from "../utils/fetchProducts";
import ProductItem from "../components/Product";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

interface Props {
  categories: Category[];
  products: Product[];
  session: Session | null;
}

const Home = ({ categories, products, session }: Props) => {
  const showProductsByCategory = (category: number) => {
    return products
      .filter((product) => product.category._ref === categories[category]._id)
      .map((product) => <ProductItem key={product._id} product={product} />);
  };

  return (
    <div>
      <Head>
        <title>Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative h-[200vh] bg-[#e6ebee]">
        <Landing />

        <div className="relative z-50 min-h-screen bg-[#1b1b1b]">
          <div className="wrapper py-20">
            <h2 className="title-secondary">New Promos</h2>

            <div className="mt-10 flex flex-col items-center">
              <Tab.Group>
                <Tab.List className="mb-10">
                  {categories &&
                    categories.map((category) => (
                      <Tab
                        key={category._id}
                        className={({ selected }) =>
                          `rounded-t-lg border-b-[2px] px-2 py-2 text-sm outline-none sm:py-4 sm:px-4 md:px-10 md:text-base ${
                            selected
                              ? "border-b-[#5aa6d5] bg-[#37383c] text-white"
                              : "border-b-gray-600 bg-transparent text-gray-500"
                          }`
                        }
                      >
                        {category.title}
                      </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="tab-content">
                    {showProductsByCategory(0)}
                  </Tab.Panel>
                  <Tab.Panel className="tab-content">
                    {showProductsByCategory(1)}
                  </Tab.Panel>
                  <Tab.Panel className="tab-content">
                    {showProductsByCategory(2)}
                  </Tab.Panel>
                  <Tab.Panel className="tab-content">
                    {showProductsByCategory(3)}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await fecthCategories();
  const products = await fetchProducts();
  const session = await getSession(context);

  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
