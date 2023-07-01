import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { paths } from "./path";
import { Suspense, lazy } from "react";
import Falllback from "../components/common/Fallback";
const Dasboard = lazy(() => import("../pages/Dashboard"));
const Client = lazy(() => import("../pages/Client"));
const Product = lazy(() => import("../pages/Products"));
const Invoices = lazy(() => import("../pages/Invoices"));
const AddNewInvoices = lazy(() =>
  import("../components/invoices/AddNewInvoices")
);
import React from "react";
import InvoiceDetail from "../components/invoices/InvoiceDetail";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: paths.Dasboard,
      element: (
        <Suspense fallback={<Falllback />}>
          <Dasboard />
        </Suspense>
      ),
    },
    {
      path: paths.Client,
      element: (
        <Suspense fallback={<Falllback />}>
          <Client />
        </Suspense>
      ),
    },
    {
      path: paths.Invoice,
      element: (
        <Suspense fallback={<Falllback />}>
          <Invoices />,
        </Suspense>
      ),
    },
    {
      path: paths.Product,
      element: (
        <Suspense fallback={<Falllback />}>
          <Product />
        </Suspense>
      ),
    },
    {
      path: paths.Invoice_New,
      element: (
        <Suspense fallback={<Falllback />}>
          <AddNewInvoices />
        </Suspense>
      ),
    },
    {
      path: paths.InvoiceDetail,
      element: (
        <Suspense fallback={<Falllback />}>
          <InvoiceDetail />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
