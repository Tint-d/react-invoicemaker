import React from "react";
import Layout from "../Layout";
import QuickAddProductForm from "../components/product/QuickAddProductForm";
import ProductTable from "../components/product/ProductTable";

const Products = () => {
  return (
    <div>
      <Layout>
        <div className=" flex justify-between gap-5">
          <div className=" flex-1">
            <ProductTable showAdvanceSearch  />
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
