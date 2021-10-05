import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Grid from "@material-ui/core/Grid";

const ReplyFaqModal = ({ setModalVisible, modalVisible, messageID, email }) => {
  const [message, setmessage] = useState("");

  const reply = async () => {
    let dataObject = {
      messageId: messageID,
      reply: message,
      email: email,
    };

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/admin/replyToCustomers",
          dataObject
        )

        .then(() => {
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
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
          borderRadius: "10px",
          maxWidth: "600px",
          width: "100%",
          marginTop: "5vw",
        },
      }}
      focusTrapped={true}
    >
      <div className="px-2 pt-8 pb-4 md:pb-7 md:px-8">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            reply();
          }}
        >
          {" "}
       
          <Grid container spacing={1}>
            <Grid item md={4}>
              <div className="font-bold text-lg ml-10 font-boldTallFon">
                Reply Message
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                <textarea
                  className="focus:outline-none w-full pb-2 md:pb-3 border-gray-400 border-2 focus:border-blue-900 text-base bg-white"
                  id="description"
                  type="text"
                  value={message}
                  rows={5}
                  cols={5}
                  onChange={(event) => {
                    setmessage(event.target.value);
                  }}
                />
              </div>
            </Grid>

            <Grid item md={12}>
              <button
                type="submit"
                className="focus:outline-none text-snow-900 text-base rounded border hover:border-transparent w-32 h-10 sm:w-80 sm:h-12  bg-gamboge"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  float: "right",
                  color: "white",
                }}
              >
                Send
              </button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default ReplyFaqModal;
