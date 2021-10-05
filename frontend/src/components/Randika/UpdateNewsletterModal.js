import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Grid from "@material-ui/core/Grid";
import { Image } from "cloudinary-react";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import Icon from "@material-ui/core/Icon";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { Divider } from "@material-ui/core";
// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

const UpdateNewsletterModal = ({
  setModalVisible,
  modalVisible,
  newsTitle,
  newsDescription,
  newsTag,
  newsCover,
  NID,
  deleteNews,
}) => {
  const [newTitle, setNewTitle] = useState(newsTitle);
  const [newDescription, setNewDescription] = useState(newsDescription);
  const [newTag, setNewTag] = useState(newsTag);
  const [isAdded, setIsAdded] = useState(false);
  const [file, setFile] = useState([]);

  const deleteNewsItem = async () => {
    const nid = NID;
    try {
      await axios
        .delete(
          `http://localhost:6500/matrix/api/admin/deleteNewsletter/${nid}`
        )
        .then((res) => {
          setIsAdded(true);
          setTimeout(() => {
            setModalVisible(false);
            window.location.reload(false);
          }, 3000);
        });
    } catch (err) {
      alert("error" + err);
    }
  };

  const UpdateNewsletter = async () => {
    let dataObject = {
      title: newTitle,
      description: newDescription,
      tag: newTag,
      NID: NID,
    };
    if (file.length > 0) {
      const img =
        "data:image/jpeg;base64," + file[0].getFileEncodeBase64String();
      dataObject = {
        title: newTitle,
        description: newDescription,
        tag: newTag,
        NID: NID,
        fileEnc: img,
      };
    }

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/admin/updateNewsletter",
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
          //   border: "3px solid  black",
          borderRadius: "10px",
          maxWidth: "800px",
          width: "100%",
          marginTop: "5vw",
        },
      }}
      focusTrapped={true}
    >
      {!deleteNews && (
        <div className="px-2 pt-0 pb-4 md:pb-7 md:px-8">
          <div className="mb-3">
            <h1 className="text-lg  text-gamboge font-bold mb-5 ">
              Update Newsletter Item
            </h1>
            <Divider />
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              UpdateNewsletter();
            }}
          >
            <Grid container spacing={3}>
              <Grid item md={4}>
                <div>Title</div>
              </Grid>
              <Grid item md={6}>
                <div>
                  <input
                    className="focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
                    id="title"
                    type="text"
                    onChange={(event) => {
                      setNewTitle(event.target.value);
                    }}
                    value={newTitle}
                  />
                </div>
              </Grid>
              <Grid item md={4}>
                <div>Description</div>
              </Grid>
              <Grid item md={6}>
                <div>
                  <textarea
                    className="focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
                    id="description"
                    type="text"
                    value={newDescription}
                    onChange={(event) => {
                      setNewDescription(event.target.value);
                    }}
                    rows={5}
                    cols={5}
                  />
                </div>
              </Grid>
              <Grid item md={4}>
                <div>Tag</div>
              </Grid>
              <Grid item md={6}>
                <div>
                  {" "}
                  <input
                    className="focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
                    id="tag"
                    type="text"
                    onChange={(event) => {
                      setNewTag(event.target.value);
                    }}
                    value={newTag}
                  />
                </div>
              </Grid>
              <Grid item md={4}>
                <div>Cover image</div>
              </Grid>
              <Grid item md={6}>
                <div>
                  {" "}
                  <div className="w-48 h-28 p-1 m-auto">
                    <Image
                      className="w-full h-full object-contain"
                      cloudName="grid1234"
                      publicId={newsCover.imagePublicId}
                    />
                  </div>
                  <div className="w-full p-1 h-20 float-right m-auto">
                    <div className=" border-lightSilver rounded-2xl border-8 m-1">
                      <FilePond
                        files={file}
                        onupdatefiles={setFile}
                        allowMultiple={false}
                        allowFileEncode={true}
                        maxFiles={1}
                        name="files"
                        credits={false}
                        labelIdle="Upload cover picture"
                        allowFileTypeValidation={true}
                        acceptedFileTypes={["image/*"]}
                        labelFileTypeNotAllowed={
                          "Please import valid profile picture"
                        }
                        allowImagePreview
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item md={12}>
                <div> </div>
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ float: "right" }}
                  // onClick={() => {
                  //   UpdateNewsletter();
                  // }}
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}

      {deleteNews && (
        <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
          <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
            Delete News Item
          </h6>
          <hr></hr>
          <div className="text-center text-ferrariRed m-5 ">
            <Icon>
              <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
            </Icon>
          </div>

          <h6 className="text-center text-lg">
            Do you want to delete these item? This process cannot be undone.
          </h6>
          {isAdded && <Alert severity="success">Item Deleted!</Alert>}
          <div className="text-center mt-8 grid grid-cols-2 gap-3">
            <div className="text-right">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteNewsItem();
                }}
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
      )}
    </Modal>
  );
};

export default UpdateNewsletterModal;
