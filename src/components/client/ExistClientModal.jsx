import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  IconStyle,
  defaultSearchStyle,
  defaultTdActionStyle,
  defaultTdContent,
  defaultTdContentTitleStyle,
  defaultTdStyle,
  defaultTdWrapperStyle,
} from "../constants/defaultStyle";
import { CgSearch } from "react-icons/cg";
import { TbAlignBoxLeftBottom } from "react-icons/tb";
import { useState } from "react";
import {
  setAddExistClient,
  setClientModalToggle,
  setSelectClientModalID,
} from "../../redux/client";
import { BsExclamationTriangleFill, BsPhone } from "react-icons/bs";
import { useEffect, useMemo } from "react";
import { useCallback } from "react";
import Button from "../Button/Button";
import { BiUserCircle } from "react-icons/bi";

const emptySearchForm = {
  name: "",
  email: "",
  mobile: "",
};

const ExistClientModal = () => {
  const Toggle = useSelector((state) => state.Client.modalToggle);
  const [currentItems, setCurrentItems] = useState(null);

  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useDispatch();
  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const allClient = useSelector((state) => state.Client.data);
  const existClients = useSelector((state) => state.Client.existingClient);
  // console.log(existClient);

  const product = useMemo(() => {
    let filterData = allClient.length > 0 ? [...allClient].reverse() : [];
    if (searchForm.name?.trim()) {
      filterData = allClient.filter((product) =>
        product.name.includes(searchForm.name)
      );
    }

    if (searchForm.email?.trim()) {
      filterData = filterData.filter((product) =>
        product.email.includes(searchForm.email)
      );
    }

    if (searchForm.mobile?.trim()) {
      filterData = filterData.filter((product) =>
        product.mobile.includes(searchForm.mobile)
      );
    }

    return filterData;
  }, [searchForm, allClient]);

  // console.log(product);
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
  const selectClientModalID = useSelector(
    (state) => state.Client.selectModalID
  );

  const selectClient = existClients.find((pd) => pd.id === selectClientModalID);

  const selectBtn = useCallback(
    (id, product) => {
      dispatch(setSelectClientModalID(id));
      dispatch(setAddExistClient(product));
    },
    [selectClient]
  );

  return (
    <>
      {Toggle ? (
        <>
          <div className="flex justify-center w-full h-screen items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6  h-screen">
              <div className="border-0 rounded-lg shadow-lg relative  w-full bg-white outline-none focus:outline-none h-full">
                {/* advance search */}

                <div className="bg-white rounded-xl px-5 py-3 mb-3">
                  <div className=" mb-5">Advanced Search</div>
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
                        className={defaultSearchStyle}
                        placeholder="Client Name"
                        value={searchForm.name}
                        onChange={(e) => handlerSearchValue(e, "name")}
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
                        placeholder="Client Email"
                        className={defaultSearchStyle}
                        value={searchForm.email}
                        onChange={(e) => handlerSearchValue(e, "email")}
                      />
                    </div>

                    <div className="mb-2 sm:mb-0 sm:text-left text-default-color flex flex-row font-title flex-1 px-2">
                      <div className="h-12 w-12 rounded-2xl bg-gray-100 mr-2 flex justify-center items-center text-gray-400">
                        <BsPhone
                          className={IconStyle}
                          style={{ zIndex: "1000px", fontSize: "30px" }}
                        />
                      </div>
                      <input
                        autoComplete="nope"
                        placeholder="Mobile Number"
                        className={defaultSearchStyle}
                        value={searchForm.phone}
                        onChange={(e) => handlerSearchValue(e, "phone")}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:bg-white rounded-xl sm:px-3 sm:py-3 w-full">
                  <div className="hidden sm:flex invisible sm:visible w-full flex-col sm:flex-row">
                    <div className="sm:text-left text-default-color font-title flex-1">
                      Name
                    </div>
                    <div className="sm:text-left text-default-color font-title flex-1">
                      Mobile
                    </div>
                    <div className="sm:text-left text-default-color font-title flex-1">
                      Email
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
                            <div className={defaultTdContentTitleStyle}>
                              ProductID
                            </div>
                            <div className={defaultTdContent}>
                              {product.image ? (
                                <img
                                  className="object-cover h-10 w-10 rounded-2xl"
                                  src={product.image || "#"}
                                  alt={product.name}
                                />
                              ) : (
                                <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                                  <BiUserCircle className=" text-gray-500 text-2xl" />
                                </span>
                              )}
                              <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                                {product.name}
                              </span>
                            </div>
                          </div>

                          <div className={defaultTdStyle}>
                            <div className={defaultTdContentTitleStyle}>
                              Name
                            </div>
                            <div className={defaultTdContent}>
                              <span className="whitespace-nowrap text- overflow-hidden">
                                {product.mobile}
                                {/* 09100200 */}
                              </span>
                            </div>
                          </div>

                          <div className={defaultTdStyle}>
                            <div className={defaultTdContentTitleStyle}>
                              Name
                            </div>
                            <div className={defaultTdContent}>
                              <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                                {product.email}
                              </span>
                            </div>
                          </div>

                          <div className={defaultTdActionStyle}>
                            <div className={defaultTdContentTitleStyle}>
                              Action
                            </div>
                            <div className={defaultTdContent}>
                              <Button
                                block={1}
                                onClick={() => selectBtn(product.id, product)}
                              >
                                <span>select</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
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
                </div>

                {/* buttons */}
                <div className="absolute bottom-0 left-0 w-full ">
                  <div className="flex items-center justify-end p-6 mt-auto bg-gray-200">
                    <button
                      className="text-gray-500 background-transparent border border-gray-300 rounded-xl font-semibold  px-6 py-2 text-base outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => dispatch(setClientModalToggle(false))}
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

export default ExistClientModal;
