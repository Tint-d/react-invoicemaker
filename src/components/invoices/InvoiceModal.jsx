import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconStyle,
  defaultInputLargeStyle,
  defaultInputStyle,
  defaultSearchStyle,
  defaultTdActionStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultTdStyle,
  defaultTdWrapperStyle,
} from "../constants/defaultStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddExistingPriduct,
  setModalToggle,
  setSelectModalID,
} from "../../redux/invoiceSlice";
import { CgSearch } from "react-icons/cg";
import { TbAlignBoxLeftBottom } from "react-icons/tb";
import { getAllProductSelector } from "../../redux/productSlice";
import Button from "../Button/Button";
import EmptyBar from "../common/EmptyBar";
import ReactPaginate from "react-paginate";

const emptySearchForm = {
  name: "",
  productID: "",
};

const InvoiceModal = ({ showAdvanceSearch }) => {
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const allProducts = useSelector(getAllProductSelector);
  const Toggle = useSelector((state) => state.Invoice.modalToggle);
  const dispatch = useDispatch();

  const product = useMemo(() => {
    let filterData = allProducts.length > 0 ? [...allProducts].reverse() : [];
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

  const selectBtn = (id, product) => {
    
    dispatch(setSelectModalID(id));
    dispatch(setAddExistingPriduct(product));
  };

  return (
    <>
      {Toggle ? (
        <>
          <div className="flex justify-center w-full h-screen items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6  h-screen">
              <div className="border-0 rounded-lg shadow-lg relative  w-full bg-white outline-none focus:outline-none h-full">
                {/* advance search */}

                <div className="relative p-6 flex-auto">
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
                          placeholder="Product Name"
                          className={defaultSearchStyle}
                          value={searchForm.name}
                          onChange={(e) => handlerSearchValue(e, "name")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="relative mx-10 flex-auto">
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
                </div>

                {/* tbody */}
                {currentItems &&
                  currentItems.map((product) => (
                    <div className="relative mx-10 flex-auto" key={product.id}>
                      <div className={defaultTdWrapperStyle}>
                        <div className={defaultTdStyle}>
                          <div className={defaultTdContent}>
                            <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                              {product.productID || "#"}
                            </span>
                          </div>
                        </div>

                        <div className={defaultTdStyle}>
                          <div className={defaultTdContent}>
                            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                              {product.name}
                            </span>
                          </div>
                        </div>

                        <div className={defaultTdStyle}>
                          <div className={defaultTdContent}>
                            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                              {product.price}
                            </span>
                          </div>
                        </div>

                        <div className={defaultTdStyle}>
                          <div className={defaultTdContent}>
                            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                              {product.amount}
                            </span>
                          </div>
                        </div>

                        <div className={defaultTdActionStyle}>
                          <div className={defaultTdContentTitleStyle}>
                            Action
                          </div>
                          <Button
                            block={1}
                            size="sm"
                            onClick={() => selectBtn(product.id, product)}
                          >
                            select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {product.length > 0 ? null : <EmptyBar />}

                {/* pagination */}

                {product.length > 0 && (
                  <ReactPaginate
                    className="inline-flex items-center -space-x-px mt-2  ml-5"
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

                {/* buttons */}
                <div className="absolute bottom-0 left-0 w-full ">
                  <div className="flex items-center justify-end p-6 mt-auto bg-gray-200">
                    <button
                      className="text-gray-500 background-transparent border border-gray-300 rounded-xl font-semibold  px-6 py-2 text-base outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => dispatch(setModalToggle(false))}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default InvoiceModal;
