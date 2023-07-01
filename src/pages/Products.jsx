import React from "react";
import Layout from "../Layout";
import QuickAddProductForm from "../components/product/QuickAddProductForm";
import ProductTable from "../components/product/ProductTable";

const Products = () => {
  return (
    <div>
      <Layout>
        <h1 className=" text-2xl text-gray-900 font-medium tracking-wide mb-3">
          Products
        </h1>
        <div className=" flex justify-between gap-5">
          <div className=" flex-1">
            <ProductTable showAdvanceSearch />
          </div>
          <div>
            <QuickAddProductForm />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
