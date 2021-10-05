import React,{useState} from "react";
import { Modal } from "react-responsive-modal";
import * as Yup from "yup";
import { Formik } from "formik";
import Rating from '@material-ui/lab/Rating';
import axios from "axios";

const validationSchema = Yup.object({
  bName: Yup.string().trim().required("Book Name is required"),
  comments:Yup.string().trim().required("Description is required"),


})

const AddReviewModal = ({ setModalVisible, modalVisible,productID }) => {
    // const [value, setValue] = useState(2);
    
    const [bName,setBName] = useState("");
    const [rate,setRate] = useState(2);
    const [comments,setComments] = useState("");


    const addReviewHandler = async(values) =>{
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const newReview = {
        proID:productID,
        bName:values.bName,
        rate,
        comments:values.comments,

      };
      try{
        await axios
            .post(
              "http://localhost:6500/matrix/api/customer/addReview",
              newReview,
              config
            )
            .then((res)=>{
              alert("Review added successfully");
            })
            .catch((err) =>{
              alert(err);
            });
      }catch(error){
        alert("Error Occured-" + error);
      }
    };

  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          border: "3px solid  black",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "50%",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-2 pt-8 pb-4 md:pb-7 md:px-8">
        <Formik
          initialValues={{ bName: "", rate: "", comments:"" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            console.log(values);
            addReviewHandler(values);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
               
              }}
            >
              <div className="flex flex-col mb-6">
              <h1 className="mb-5 font-bold text-2xl">Add Review</h1>
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"bookName"}
                  >
                   Book Name
                  </label>
                  <input
                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                    errors.bName && touched.bName
                      ? "border-red-500"
                      : "border-gray-600"
                  }  text-base`}
                    id="email"
                    type="text"
                    onChange={handleChange("bName")}
                    value={values.bName}
                  />
                  {errors.bName && touched.bName ? (
                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                      {errors.bName}
                    </div>
                  ) : null}
                </div>
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                  setRate(newValue);
                }}
              />
                </div>
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"comment"}
                  >
                  Comment
                  </label>
                  <textarea
                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                    errors.comments && touched.comments
                      ? "border-red-500"
                      : "border-gray-600"
                  }  text-base`}
                    id="comment"
                    type="text"
                    onChange={handleChange("comments")}
                    value={values.comments}
                
                  />
                  {errors.comments && touched.comments ? (
                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                      {errors.comments}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row  space-x-2  text-center mb-4 md:mb-6">
                <button
                  type="submit"
                  className="focus:outline-none bg-yellow-500 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                  style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                >
                  Submit
                </button>
                <button
                type="submit"
                className="focus:outline-none bg-gray-400 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12"
                style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                onClick={()=>{
                  setModalVisible(false);
                }}
              >
                Cancel
              </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddReviewModal;
