import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import Alert from "@material-ui/lab/Alert";

const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const EditQaModal = ({
  setModalVisible,
  modalVisible,
  editQuestion,
  geta,
  getq,
}) => {
  const [qaIsAdded, setqaIsAdded] = useState(false);
  return (
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
          maxWidth: "500px",
          width: "50%",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
        <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
          Edit Question and Answer
        </h6>
        <hr></hr>

        <Formik
          initialValues={{ question: getq, answer: geta }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              editQuestion(values);
              setqaIsAdded(true);
              setTimeout(() => {
                setqaIsAdded(true);
              }, 2000);
              setTimeout(() => {
                setModalVisible(false);
              }, 3000);
            } catch (error) {}
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <div className=" grid grid-rows-2 gap-0 mt-2 ">
                <div className="grid grid-cols-4 px-2 py-2">
                  <div className="  ">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"question"}
                    >
                      Question :
                    </label>
                  </div>

                  <div className=" col-span-3 ml-1">
                    <textarea
                      className={`focus:outline-none  h-32 w-full pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver  ${
                        errors.question && touched.question
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="question"
                      type="Textarea"
                      placeholder="Enter Question"
                      onChange={handleChange("question")}
                      value={values.question}
                    />
                    {errors.question && touched.question ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.question}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-4 px-2 py-2">
                  <div className="  ">
                    <label
                      className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                      htmlFor={"answer"}
                    >
                      Answer :
                    </label>
                  </div>

                  <div className="  col-span-3 ml-1">
                    <textarea
                      className={`focus:outline-none  h-32 w-full pl-2 border-2 rounded-lg focus:border-halloweenOrange border-lightSilver  ${
                        errors.answer && touched.answer
                          ? "border-red-500"
                          : "border-gray-600"
                      } text-base`}
                      id="answer"
                      type="Textarea"
                      placeholder="Enter Answer"
                      onChange={handleChange("answer")}
                      value={values.answer}
                    />
                    {errors.answer && touched.answer ? (
                      <div className="text-red-500 text-xs mt-1 md:text-sm">
                        {errors.answer}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {qaIsAdded && (
                <Alert severity="success">Successfully updated</Alert>
              )}
              <div className="text-center mb-0 mt-4">
                <button
                  type="submit"
                  className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditQaModal;
