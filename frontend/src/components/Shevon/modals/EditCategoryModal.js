import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import AddQaModal from "./AddQaModal";
import EditQaModal from "./EditQaModal";
import DeleteModal from "./DeleteQandAmodal";
import * as Yup from "yup";
import { Formik } from "formik";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  categoryName: Yup.string().required("CategoryName required"),
});

const EditFaqModal = ({
  setModalVisible,
  modalVisible,
  selectedTuple,
  setFetchedRows,
  setSelectedRows,
  getdata,
  useQuestions,
  CID,
}) => {
  const [addQaOPen, setAddQaOpen] = useState(false);
  const [editQaOPen, setEditQaOpen] = useState(false);
  const [deleteOpen, setdeleteOpen] = useState(false);

  const [questions, setQuestions] = useQuestions;

  const [QAID, setQAID] = useState();
  const [getq, setgetq] = useState();
  const [geta, setgeta] = useState();
  const [isAdded, setIsAdded] = useState(false);

  const updateCategory = async (values) => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/editcategory",
        {
          CID: selectedTuple,
          category: values.categoryName,
        }
      );
      const filterFunc = (rows) =>
        rows.map((row) => {
          if (row.code === selectedTuple)
            return { ...row, categoryName: values.categoryName };
          else return row;
        });
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
      setIsAdded(true);
      setFetchedRows(filterFunc);
      setSelectedRows(filterFunc);
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = async (values) => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/addQA",
        {
          CID: selectedTuple,
          question: values.question,
          answer: values.answer,
        }
      );

      setQuestions((questions) => [...questions, { ...values }]);
    } catch (error) {
      console.log(error);
    }
  };

  const editQuestion = async (values) => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/editqa",
        {
          QAID,
          question: values.question,
          answer: values.answer,
        }
      );
      setQuestions((questions) =>
        questions.map((question) => {
          if (question._id === QAID)
            return { question: values.question, answer: values.answer };
          else return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async () => {
    try {
      await axios.put(
        "http://localhost:6500/matrix/api/deliveryManager/deleteqa",
        {
          CID,
          QAID,
        }
      );
      setQuestions((questions) =>
        questions.filter((ques) => ques._id !== QAID)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        center
        styles={{
          modal: {
            border: "1px solid  gray",
            borderRadius: "8px",
            maxWidth: "700px",
            width: "50%",
          },
        }}
        focusTrapped={true}
      >
        <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
          <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
            Update Category
          </h6>
          <hr></hr>

          <Formik
            initialValues={{ categoryName: getdata }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values);
              updateCategory(values);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="grid grid-cols-4 mt-3">
                  <div className="text-left  pt-1">
                    <label className="block text-sm font-medium leading-149 mb-3 md:text-lg">
                      Category Name :
                    </label>
                  </div>

                  <div>
                    <input
                      className={`focus:outline-none w-64 h-8 pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver ${
                        errors.categoryName && touched.categoryName
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="categoryName"
                      type="text"
                      placeholder="Enter Category Name"
                      onChange={handleChange("categoryName")}
                      value={values.categoryName}
                    />
                    {errors.categoryName && touched.categoryName ? (
                      <div className="text-red-500 text-xs mt-1 ">
                        {errors.categoryName}
                      </div>
                    ) : null}
                  </div>

                  <div className=" col-span-2 text-right">
                    <button
                      type="submit"
                      className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6  rounded-full"
                      style={{
                        boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          {isAdded && <Alert severity="success">Successfully added</Alert>}

          <div className="  mt-4">
            <div
              className=" h-14  rounded-xl   my-2 mx-0 px-5 pt-2  border-0  shadow-md bg-gamboge bg-opacity-15 hover:bg-halloweenOrange"
              onClick={() => {
                setEditQaOpen(false);
                setdeleteOpen(false);
                setAddQaOpen(true);
              }}
            >
              <h5 className="text-white font-black text-md">
                <Icon className="text-white mr-5 ">
                  <AddCircleRoundedIcon />
                </Icon>
                Add New Question And Answer
              </h5>
            </div>

            <div
              className="mt-4  shadow-md bg-blueSapphire rounded-xl px-3 py-1 overflow-y-auto"
              style={{ maxHeight: "300px" }}
            >
              {questions.map((question) => (
                <div
                  key={question._id}
                  className="bg-lightSilver rounded-xl  my-2 "
                >
                  <div className="py-2 px-2 font-black">
                    {question.question}
                  </div>

                  <hr></hr>

                  <div
                    className="py-2 px-2 overflow-y-auto"
                    style={{ maxHeight: "100px" }}
                  >
                    {question.answer}
                  </div>

                  <hr></hr>

                  <div className="text-right py-2 px-2">
                    <Icon
                      className="mr-4 hover:text-gamboge"
                      onClick={() => {
                        setAddQaOpen(false);
                        setdeleteOpen(false);
                        setEditQaOpen(true);
                        setQAID(question._id);
                        setgetq(question.question);
                        setgeta(question.answer);
                      }}
                    >
                      <EditIcon />
                    </Icon>
                    <Icon
                      className="mr-4 hover:text-red-600"
                      onClick={() => {
                        setAddQaOpen(false);
                        setEditQaOpen(false);
                        setdeleteOpen(true);
                        setQAID(question._id);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Icon>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {addQaOPen && (
        <AddQaModal
          modalVisible={addQaOPen}
          setModalVisible={setAddQaOpen}
          addQuestion={addQuestion}
        />
      )}

      {editQaOPen && (
        <EditQaModal
          modalVisible={editQaOPen}
          setModalVisible={setEditQaOpen}
          editQuestion={editQuestion}
          getq={getq}
          geta={geta}
        />
      )}

      {deleteOpen && (
        <DeleteModal
          modalVisible={deleteOpen}
          setModalVisible={setdeleteOpen}
          deleteQuestion={deleteQuestion}
        />
      )}
    </div>
  );
};

export default EditFaqModal;
