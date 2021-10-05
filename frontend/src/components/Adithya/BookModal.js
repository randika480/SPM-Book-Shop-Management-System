import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { Image } from "cloudinary-react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Icon from "@material-ui/core/Icon";

const BookModal = ({ setModalVisible, modalVisible, bookID, ISBN }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmationModalOpen, setConfirmationModelOpen] = useState(false);
  const [triggerGetBookData, setTriggerGetBookData] = useState(false);
  const [bookData, setBookData] = useState({
    publishingTitle: "",
    originalTitle: "",
    translator: "",
    originalAuthor: "",
    aboutAuthor: "",
    aboutBook: "",
    ISBN: "",
    category: "",
    license: "",
    inStockQuantity: "",
    translatorContact: "",
    press: "",
    proofReader: "",
    coverDesigner: "",
    typeSetter: "",
    weight: "",
    marketPrice: "",
    imagePublicId: "",
    imageSecURL: "",
    coverCost: "",
    licenseCost: "",
    writerPayment: "",
    proofReadingPayment: "",
    typeSetterPayment: "",
    printCost: "",
  });

  useEffect(() => {
    const getBookData = async () => {
      if (bookID) {
        await axios
          .get(
            `http://localhost:6500/matrix/api/inventoryManager/get-book/${ISBN}`
          )
          .then((res) => {
            setBookData((prevState) => {
              return {
                publishingTitle: res?.data?.book?.publishingTitle,
                originalTitle: res?.data?.book?.originalTitle,
                translator: res?.data?.book?.translator,
                originalAuthor: res?.data?.book?.originalAuthor,
                aboutAuthor: res?.data?.book?.aboutAuthor,
                aboutBook: res?.data?.book?.aboutBook,
                ISBN: res?.data?.book?.ISBN,
                category: res?.data?.book?.category,
                license: res?.data?.book?.license,
                inStockQuantity: res?.data?.book?.inStockQuantity,
                translatorContact: res?.data?.book?.translatorContact,
                press: res?.data?.book?.press,
                proofReader: res?.data?.book?.proofReader,
                coverDesigner: res?.data?.book?.coverDesigner,
                typeSetter: res?.data?.book?.typeSetter,
                weight: res?.data?.book?.weight,
                marketPrice: res?.data?.book?.marketPrice,
                imagePublicId: res?.data?.book?.bookImage?.imagePublicId,
                imageSecURL: res?.data?.book?.bookImage?.imageSecURL,
                coverCost: res?.data?.book?.charges?.coverCost,
                licenseCost: res?.data?.book?.charges?.licenseCost,
                writerPayment: res?.data?.book?.charges?.writerPayment,
                proofReadingPayment:
                  res?.data?.book?.charges?.proofReadingPayment,
                typeSetterPayment: res?.data?.book?.charges?.typeSetterPayment,
                printCost: res?.data?.book?.charges?.printCost,
              };
            });
          })
          .catch((err) => {
            alert(err.response.data.desc);
          });
      }
    };
    getBookData();
  }, [ISBN, bookID, triggerGetBookData]);

  const deleteBookHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    await axios
      .delete(
        `http://localhost:6500/matrix/api/inventoryManager/delete-book/${bookData.ISBN}`,
        config
      )
      .then((res) => {
        setIsDeleted(true);
        setTimeout(() => {
          setConfirmationModelOpen(false);
          setModalVisible(false);
        }, [2000]);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
  };

  const updateBookHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .put(
        "http://localhost:6500/matrix/api/inventoryManager/edit-book",
        bookData,
        config
      )
      .then((res) => {
        alert(res?.data?.desc);
        setIsEdit(false);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
  };

  return (
    <>
      <Modal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        center
        styles={{
          modal: {
            borderRadius: "10px",
            maxWidth: "35vw",
            marginTop: "10vh",
          },
        }}
        focusTrapped={true}
      >
        <div>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              style={{
                fontWeight: 900,
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              {bookData?.publishingTitle?.length > 1 &&
                `${bookData?.publishingTitle}`}
            </Grid>
            <Grid item xs={12}>
              <div className="mt-10 m-auto mb-3 max-w-lg flex justify-center">
                {bookData?.imagePublicId?.length > 1 ? (
                  <Image
                    className=" w-2/4"
                    cloudName="grid1234"
                    publicId={bookData.imagePublicId}
                  />
                ) : null}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="overflow-y-auto max-h-60 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 my-4">
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Publishing Title
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Publishing Title"
                      value={`${bookData.publishingTitle}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            publishingTitle: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.publishingTitle.length > 1 &&
                        `${bookData.publishingTitle}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Original Title
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Original Title"
                      value={`${bookData.originalTitle}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            originalTitle: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.originalTitle.length > 1 &&
                        `${bookData.originalTitle}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Translator
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Translator"
                      value={`${bookData.translator}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            translator: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.translator.length > 1 &&
                        `${bookData.translator}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Original Author
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Original Author"
                      value={`${bookData.originalAuthor}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            originalAuthor: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.originalAuthor.length > 1 &&
                        `${bookData.originalAuthor}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    About Author
                  </label>
                  {isEdit ? (
                    <textarea
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="About Author"
                      value={`${bookData.aboutAuthor}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            aboutAuthor: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.aboutAuthor.length > 1 &&
                        `${bookData.aboutAuthor}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    About Book
                  </label>
                  {isEdit ? (
                    <textarea
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="About Book"
                      value={`${bookData.aboutBook}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            aboutBook: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.aboutBook.length > 1 &&
                        `${bookData.aboutBook}`}
                    </p>
                  )}
                </div>
                <div>
                  <div>
                    <label className="text-sm font-black md:text-lg">
                      ISBN
                    </label>
                  </div>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="ISBN"
                      value={`${bookData.ISBN}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            ISBN: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>{bookData?.ISBN.length > 1 && `${bookData.ISBN}`}</p>
                  )}
                </div>
                <div>
                  <div>
                    <label className="text-sm font-black md:text-lg">
                      Weight
                    </label>
                  </div>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Weight"
                      value={`${bookData.weight}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            weight: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>{bookData?.weight > 0 && `${bookData.weight}`}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Market Price
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Market Price"
                      value={`${bookData.marketPrice}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            marketPrice: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.marketPrice > 0 && `${bookData.marketPrice}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Writer Payment
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Writer Payment"
                      value={`${bookData.writerPayment}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            writerPayment: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>
                      {bookData?.writerPayment > 0 &&
                        `${bookData.writerPayment}`}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-black md:text-lg">
                    Print Cost
                  </label>
                  {isEdit ? (
                    <input
                      className={`focus:outline-none w-60 h-8 pl-2 border-2 rounded-lg border-lightSilver focus:border-halloweenOrange text-base`}
                      type="text"
                      placeholder="Print Cost"
                      value={`${bookData.printCost}`}
                      onChange={(e) => {
                        setBookData((prevState) => {
                          return {
                            ...prevState,
                            printCost: e.target.value,
                          };
                        });
                      }}
                    />
                  ) : (
                    <p>{bookData?.printCost > 0 && `${bookData.printCost}`}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {isEdit ? (
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setTriggerGetBookData(true);
                    }}
                    className="focus:outline-none bg-gray-400 font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    CANCEL
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEdit(true);
                    }}
                    className="focus:outline-none bg-gamboge font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                  >
                    EDIT
                  </button>
                )}
                {isEdit ? (
                  <button
                    type="submit"
                    className="focus:outline-none bg-gamboge ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                    onClick={updateBookHandler}
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="focus:outline-none bg-ferrariRed ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                    style={{
                      boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    }}
                    onClick={() => {
                      setConfirmationModelOpen(true);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <Modal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModelOpen(false)}
        center
        styles={{
          modal: {
            border: "1px solid  gray",
            borderRadius: "8px",
            maxWidth: "500px",
            width: "50%",
          },
        }}
        focusTrapped={true}
      >
        <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
          <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
            Delete Book
          </h6>
          <hr></hr>
          <div className="text-center text-ferrariRed m-5 ">
            <Icon>
              <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
            </Icon>
          </div>

          <h6 className="text-center text-lg">
            Do you want to delete these data? This process cannot be undone.
          </h6>
          {isDeleted && (
            <Alert severity="success">Item deleted successfully</Alert>
          )}
          <div className="text-center mt-8 grid grid-cols-2 gap-3">
            <div className="text-right">
              <Button
                variant="contained"
                style={{
                  background: "#EA2300",
                  color: "white",
                  fontWeight: 700,
                }}
                startIcon={<DeleteIcon />}
                onClick={deleteBookHandler}
              >
                Agree
              </Button>
            </div>
            <div className="text-left">
              <Button
                autoFocus
                variant="contained"
                style={{
                  fontWeight: 700,
                }}
                onClick={() => {
                  setConfirmationModelOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookModal;
