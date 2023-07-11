import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconStyle,
  defaultSearchStyle,
  defaultTdActionStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultTdStyle,
  defaultTdWrapperStyle,
} from "../constants/defaultStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductSelector,
  setDeleteId,
  setEditedId,
} from "../../redux/productSlice";
import { CgSearch } from "react-icons/cg";
import { TbAlignBoxLeftBottom } from "react-icons/tb";
import Button from "../Button/Button";
import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { BiDotsHorizontalRounded, BiUserCircle } from "react-icons/bi";
import EmptyBar from "../common/EmptyBar";
import ReactPaginate from "react-paginate";
import ProductEditModal from "./ProductEditModal";
import { Modal } from "@mantine/core";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { AiFillFileExcel } from "react-icons/ai";

const emptySearchForm = {
  name: "",
  productID: "",
};

const ProductTable = ({ showAdvanceSearch = false }) => {
  const allProducts = useSelector(getAllProductSelector);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const [opened, { open, close }] = useDisclosure(false);

  const product = useMemo(() => {
    let filterData = allProducts.length > 0 ? [...allProducts].sort() : [];
    if (searchForm.name?.trim()) {
      filterData = allProducts.filter((product) =>
        product.name.includes(searchForm.name)
      );
    }

    if (searchForm.productID?.trim()) {
      filterData = filterData.filter((product) =>
        product.productID.includes(searchForm.productID)
      );
    }

    return filterData;
  }, [searchForm, allProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;

    setItemOffset(newOffset);
  };

  const handlerSearchValue = useCallback((event, keyName) => {
    const value = event.target.value;

    setSearchForm((prev) => {
      return { ...prev, [keyName]: value };
    });
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(product.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(product.length / itemsPerPage));
  }, [product, itemOffset]);

  const handleEdit = (id) => {
    // console.log("productID",{id});
    dispatch(setEditedId(id));
  };

  const handleDelete = (id) => {
    dispatch(setDeleteId(id));
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const apiData = product?.map((product) => ({
    ProductID: product.productID || "#",
    Name: product.name,
    Price: product.price,
    Amount: product.amount,
  }));

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "excel" + fileExtension);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <h1 className=" text-2xl text-gray-900 font-medium tracking-wide mb-3">
          Products
        </h1>
        <Button block={1} size="sm" onClick={exportToCSV}>
          <div className=" flex items-center gap-2">
            <AiFillFileExcel className=" text-xl" />
            <span>Download Excel</span>
          </div>
        </Button>
      </div>
      {showAdvanceSearch === true && (
        <div className="bg-white rounded-xl px-3 py-3 mb-3">
          <div className="font-title mb-2">Advanced Search</div>
          <div className="flex w-full flex-col sm:flex-row">
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row  font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
                <TbAlignBoxLeftBottom
                  className={IconStyle}
                  style={{ zIndex: "1000px", fontSize: "30px" }}
                />
              </div>
              <input
                autoComplete="nope"
                value={searchForm.productID}
                placeholder="Product ID"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "productID")}
              />
            </div>
            <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
                <CgSearch
                  className={IconStyle}
                  style={{ zIndex: "1000px", fontSize: "30px" }}
                />
              </div>
              <input
                autoComplete="nope"
                value={searchForm.name}
                placeholder="Product Name"
                className={defaultSearchStyle}
                onChange={(e) => handlerSearchValue(e, "name")}
              />
            </div>
          </div>
        </div>
      )}

      <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3">
        <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
          <div className="sm:text-left text-default-color font-title flex-1">
            ProductID
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Name
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Price
          </div>
          <div className="sm:text-left text-default-color font-title flex-1">
            Amount
          </div>
          <div className="sm:text-left text-default-color font-title sm:w-11">
            Action
          </div>
        </div>

        <div>
          {currentItems &&
            currentItems.map((product) => (
              <div className={defaultTdWrapperStyle} key={product.id}>
                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>ProductID</div>
                  <div className={defaultTdContent}>
                    {product.image ? (
                      <img
                        className="object-cover h-10 w-10 rounded-2xl"
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                        <BiUserCircle className=" text-gray-500 text-2xl" />
                      </span>
                    )}
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                      {product.productID || "#"}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {product.name}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {product.price}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Amount</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {product.amount}
                    </span>
                  </div>
                </div>

                <div className={defaultTdActionStyle}>
                  <div className={defaultTdContentTitleStyle}>Action</div>
                  <div className={defaultTdContent}>
                    <Menu
                      menuButton={
                        <MenuButton>
                          <div className="bg-gray-50 px-2 rounded-xl">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                            {/* <BiDotsHorizontalRounded className=" text-blue-500 text-lg"/> */}
                          </div>
                        </MenuButton>
                      }
                      transition
                    >
                      <div>
                        <MenuItem onClick={() => handleEdit(product.id)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={open}>Delete</MenuItem>
                      </div>
                    </Menu>
                  </div>
                  <Modal.Root opened={opened} centered size={"md"}>
                    <Modal.Overlay />
                    <Modal.Content className="">
                      <div className=" flex items-center gap-6 bg-white  mx-5">
                        <div className="">
                          <span className="bg-red-100  w-8 h-8 rounded-full flex justify-center items-center">
                            <BsExclamationTriangleFill className=" text-red-400" />
                          </span>
                        </div>
                        <div className=" mt-3">
                          <h2 className=" text-gray-700 text-xl font-medium">
                            Deleted Selected Product{" "}
                          </h2>
                          <p className=" text-gray-500 text-">
                            Are you sure you want to delete this invoice letter?
                            This action cannot be undone.
                          </p>
                        </div>
                      </div>
                      <div className=" flex justify-end  items-center bg-gray-50 h-16 w-full gap-2 mt-5">
                        <button
                          onClick={() => handleDelete(product?.id)}
                          className=" bg-red-500 text-white px-6 py-1 rounded"
                        >
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={close}
                          className=" bg-transparent  py-1 px-6 border rounded border-gray-400"
                        >
                          <span>Cancle</span>
                        </button>
                        <div></div>
                      </div>
                    </Modal.Content>
                  </Modal.Root>
                </div>
              </div>
            ))}

          {product.length <= 0 && <EmptyBar />}

          {product.length > 0 && (
            <ReactPaginate
              className="inline-flex items-center -space-x-px mt-2"
              previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              nextLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              pageLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              breakLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              nextLabel={">"}
              renderOnZeroPageCount={null}
            />
          )}
          <ProductEditModal />
        </div>
      </div>
    </>
  );
};

export default ProductTable;
