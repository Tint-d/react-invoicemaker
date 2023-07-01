import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CgSearch } from "react-icons/cg";
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
import { TbAlignBoxLeftBottom } from "react-icons/tb";
import { BsExclamationTriangleFill, BsPhone } from "react-icons/bs";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import EmptyBar from "../common/EmptyBar";
import { setClientEditId, setRemoveClient } from "../../redux/client";
import { BiUserCircle } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import ClientModal from "./ClientModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const emptySearchForm = {
  name: "",
  email: "",
  mobile: "",
};

const ClientTable = ({ advance }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const dispatch = useDispatch();
  const [searchForm, setSearchForm] = useState(emptySearchForm);
  const allClient = useSelector((state) => state.Client.data);
  const editClientID = useSelector((state) => state.Client.editedID);
  const [opened, { open, close }] = useDisclosure(false);

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

  const handleEdit = (id) => {
    dispatch(setClientEditId(id));
  };

  const handleDelete = (id) => {
    dispatch(setRemoveClient(id));
    close();
  };

  return (
    <>
      {/* advance search */}
      {advance ? (
        ""
      ) : (
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
      )}

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
                  <div className={defaultTdContentTitleStyle}>ProductID</div>
                  <div className={defaultTdContent}>
                    {product.image ? (
                      <img
                        className="object-cover h-10 w-10 rounded-2xl"
                        src={product.image || "#"}
                        alt={product.name}
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-2xl bg-gray-100 flex justify-center items-center">
                        <BiUserCircle className=" text-gray-500 text-2xl"/>
                      </span>
                    )}
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden pl-1">
                      {/* {product.productID || "#"} */}
                      {product.name}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text- overflow-hidden">
                      {product.mobile}
                      {/* 09100200 */}
                    </span>
                  </div>
                </div>

                <div className={defaultTdStyle}>
                  <div className={defaultTdContentTitleStyle}>Name</div>
                  <div className={defaultTdContent}>
                    <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {product.email}
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
                          </div>
                        </MenuButton>
                      }
                      transition
                    >
                      <div>
                        <MenuItem onClick={() => handleEdit(product?.id)}>
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
                            Deleted Selected Clients{" "}
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
      <ClientModal />
    </>
  );
};

export default ClientTable;
