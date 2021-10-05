import React,{ useState } from 'react';
import { Modal } from "react-responsive-modal";
import { Formik } from "formik";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const DeleteReviewModal = ({setModalVisible, modalVisible,reviewID}) => {
  const [isAdded, setIsAdded] = useState(false);
  const deleteReview = async (values) =>{
   
   try{
      const res = await axios
        .delete(
          "http://localhost:6500/matrix/api/customer/deleteReview",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            data:{
              reviewId: reviewID,
            }
          }
        );
        setIsAdded(true);
      }catch(error){
        alert("error "+error);
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
          Delete Review
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
        {isAdded && (
          <Alert severity="success">This is a success message!</Alert>
        )}
        <div className="text-center mt-8 grid grid-cols-2 gap-3">
          <div className="text-right">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={deleteReview}
            >
              Agree
            </Button>
          </div>
          <div className="text-left">
            <Button
              autoFocus
              variant="contained"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
    )
}

export default DeleteReviewModal;
