import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import AddQaModal from "./AddQaModal";
import EditQaModal from "./EditQaModal";
import moment from "moment";

const ReplyedModal = ({
  setModalVisible,
  modalVisible,
  useReply,
  getinqiur,
}) => {
  const [addQaOPen, setAddQaOpen] = useState(false);
  const [editQaOPen, setEditQaOpen] = useState(false);

  console.log(useReply);
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
            Reply for #{getinqiur.code}
          </h6>
          <hr></hr>

          <div className="  mt-4">
            <h5 className="ml-0  font-black text-base text-left">
              Customer Inquiry
            </h5>

            <p className="ml-4 mt-4 text-left">{getinqiur.message}</p>
            <p className="ml-0  font-black text-xs text-right">
              Created Date: {moment(getinqiur.cDate).format("LLLL")}
            </p>
          </div>

          <div className="  mt-4">
            <div
              className="mt-4  shadow-md bg-blueSapphire rounded-xl px-3 py-1 overflow-y-auto"
              style={{ maxHeight: "300px" }}
            >
              {useReply.map((rep, index) => (
                <div key={index} className="bg-lightSilver rounded-xl  my-2 ">
                  <div className="py-2 px-2 font-black">Reply {index + 1}</div>

                  <hr></hr>

                  <div
                    className="py-2 px-2 overflow-y-auto"
                    style={{ maxHeight: "100px" }}
                  >
                    {rep.replynote}
                  </div>

                  <hr></hr>

                  <div className="text-right py-2 px-2 font-black text-xs">
                    Replyed Date: {moment(rep.replyedAt).format("LLLL")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {addQaOPen && (
        <AddQaModal modalVisible={addQaOPen} setModalVisible={setAddQaOpen} />
      )}
      {editQaOPen && (
        <EditQaModal
          modalVisible={editQaOPen}
          setModalVisible={setEditQaOpen}
        />
      )}
    </div>
  );
};

export default ReplyedModal;
