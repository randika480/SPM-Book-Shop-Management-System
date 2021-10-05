import React, { useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

const AddNewNewsletter = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTag, setNewTag] = useState("");

  const [file, setFile] = useState([]);

  const CreateNewsItem = async () => {
    const img = "data:image/jpeg;base64," + file[0].getFileEncodeBase64String();

    let dataObject = {
      title: newTitle,
      description: newDescription,
      tag: newTag,
      fileEnc: img,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios
        .post(
          "http://localhost:6500/matrix/api/admin/createNewsletter",
          dataObject,
          config
        )

        .then(() => {
          alert("New Item Added");
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  return (
    <div className="w-3/4 m-auto mt-5 bg-white p-5 rounded-lg">
      <h1 className="text-xl text-center text-black font-bold mb-1">
        Create Newsletter
      </h1>
      <Divider />

      <div className="mt-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            CreateNewsItem();
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={4}>
              <div>
                <h1 className="text-xl text-left text-black font-bold mb-5 ml-24">
                  Title :
                </h1>
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                <input
                  className="border-gray-400 focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
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
              <div>
                <h1 className="text-xl text-left text-black font-bold mb-5 ml-24">
                  Description :
                </h1>
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                <textarea
                  className="border-gray-400 focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
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
              <div>
                <h1 className="text-xl text-left text-black font-bold mb-5 ml-24">
                  Tag :
                </h1>
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                {" "}
                <input
                  className="border-gray-400 focus:outline-none w-full pb-2 md:pb-3 border focus:border-blue-600 text-base bg-white"
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
              <div>
                <h1 className="text-xl text-left text-black font-bold mb-5 ml-24">
                  Cover image :
                </h1>
              </div>
            </Grid>
            <Grid item md={6}>
              <div>
                {" "}
                <div className="w-full h-38 p-1 m-auto">
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
                      required
                      allowImagePreview
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="w-max m-auto">
                <button
                  type="submit"
                  className="object-center focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                    float: "right",
                    color: "white",
                  }}
                >
                  ADD
                </button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddNewNewsletter;
