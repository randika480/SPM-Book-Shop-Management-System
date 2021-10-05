import React from "react";
import { Modal } from "react-responsive-modal";
import { Divider } from "@material-ui/core";

const BookRequestModal = ({ setModalVisible, modalVisible }) => {
  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-2 pb-4 md:pb-7 md:px-8">
        <div className="mb-3">
          <h1 className="text-lg  text-gamboge font-bold mb-5 ">
            Book Requests
          </h1>
          <Divider />
        </div>
        <h1 className="text-lg text-center text-red-700 font-bold mb-5 ">
          Do you need to send request to translations Section?
        </h1>
        <button
          type="submit"
          className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-32 h-10 sm:w-80 sm:h-12 bg-gamboge"
          style={{
            boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
            float: "right",
            color: "white",
          }}
          onClick={() => {
            setModalVisible(false);
          }}
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-32 h-10 sm:w-80 sm:h-12 bg-gamboge"
          style={{
            boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
            float: "right",
            color: "white",
          }}
          onClick={() => {
            alert("Request Sent");
            setModalVisible(false);
          }}
        >
          SEND
        </button>
      </div>
    </Modal>
  );
};

export default BookRequestModal;
