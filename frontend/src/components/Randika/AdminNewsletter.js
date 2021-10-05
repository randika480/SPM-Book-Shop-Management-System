import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateNewsletterModal from "./UpdateNewsletterModal";
import { Image } from "cloudinary-react";
import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import AddNewNewsletter from "./AddNewNewsletter";
import ReplayIcon from "@material-ui/icons/Replay";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

const AdminNewsletter = () => {
  const [addNewItemOpen, setAddNewItemOpen] = useState(true);

  const [searchTerm, setsearchTerm] = useState("");

  const [newsletterItems, setNewsletterItems] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteNews, setDeleteNews] = useState(false);

  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsTag, setnewsTag] = useState("");
  const [newsCover, setnewsCover] = useState("");
  const [newsID, setnewsID] = useState("");

  useEffect(() => {
    const getNewsletterItems = async () => {
      const array = [];
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getNewsletters", config)
          .then((res) => {
            for (let i = res.data.Newsletters.length - 1; i >= 0; i--) {
              array.push(res.data.Newsletters[i]);
            }
            setNewsletterItems(array);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    getNewsletterItems();
  }, []);
  return (
    <div className="w-full h-auto m-auto">
      {addNewItemOpen && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={9}></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div
              className="w-48 bg-gamboge float-right h-12 rounded-full "
              onClick={() => {
                setAddNewItemOpen(false);
              }}
            >
              <h1
                className=" text-lg font-bold text-center m-auto mt-2"
                style={{ color: "white" }}
              >
                View Added Items
              </h1>
            </div>
          </Grid>
        </Grid>
      )}
      {!addNewItemOpen && (
        <div>
          {" "}
          <Grid container spacing={1} className="bg-white rounded-lg">
            <Grid item xs={12} sm={6} md={9}>
              <div className=" m-1 pr-10">
                <div className="w-max mb-1 p-1 mt-3 bg-lightSilver rounded-lg  h-14">
                  <div className="w-max h-16 " style={{ float: "left" }}>
                    <div className="w-max h-16" style={{ float: "left" }}>
                      <input
                        type="text"
                        className="w-60 h-11 p-5 rounded-3xl m-2 mt-0"
                        id="code"
                        placeholder="Search Here"
                        value={searchTerm}
                        onChange={(event) => {
                          setsearchTerm(event.target.value);
                        }}
                        style={{ float: "left" }}
                      ></input>
                    </div>

                    {searchTerm && (
                      // <div className="cursor-pointer w-max mt-1 h-9 bg-red rounded-3xl bg-black p-2 pl-4 pr-4 float-left ml-3 transform hover:scale-110 motion-reduce:transform-none">
                      //   <p
                      //     className=" text-white font-bold text-center text-sm"
                      //     onClick={() => {
                      //       setsearchTerm("");
                      //     }}
                      //   >
                      //     Clear
                      //   </p>
                      // </div>
                      <ReplayIcon
                        style={{ float: "left" }}
                        className="m-3"
                        onClick={() => {
                          setsearchTerm("");
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <div className=" m-1 pt-4 h-16">
                <div
                  className="w-48 bg-gamboge float-right h-12 rounded-full "
                  onClick={() => {
                    setAddNewItemOpen(true);
                  }}
                >
                  <ControlPointIcon
                    className="mt-1 ml-4 float-left"
                    style={{ fontSize: 40, color: "white" }}
                  />
                  <h1
                    className="float-left text-lg font-bold mt-2 ml-1 "
                    style={{ color: "white" }}
                  >
                    Add New Item
                  </h1>
                </div>
              </div>
            </Grid>
          </Grid>
          <div
            className=" m-auto p-2 overflow-y-auto mt-6 bg-gray-400 pt-2"
            style={{ maxHeight: "500px" }}
          >
            {newsletterItems
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  val.tag.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
                return null;
              })
              .map((row, index) => {
                return (
                  <div
                    className="w-2/3 h- m-auto bg-white shadow-2xl rounded-lg"
                    key={index}
                  >
                    <div className=" h-96 m-5 pt-5">
                      <h1 className="text-xl text-left text-prussianBlue font-bold ">
                        {row.title}
                      </h1>
                      <h1 className="text-m text-left text-gray-500 font-bold ">
                        {row.tag}
                      </h1>

                      <div>
                        <div
                          className="w-2/3  p-3 h-60"
                          style={{ float: "left" }}
                        >
                          <p className="object-cover">{row.description}</p>
                        </div>
                        <div className="w-1/3  h-60" style={{ float: "left" }}>
                          <div className="w-full h-full p-1">
                            <Image
                              className="w-full h-full object-contain "
                              cloudName="grid1234"
                              publicId={row.coverImage.imagePublicId}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="m-1" style={{ float: "right" }}>
                        <EditIcon
                          className=" mr-16"
                          style={{ fontSize: 35 }}
                          onClick={() => {
                            setNewsTitle(row.title);
                            setNewsDescription(row.description);
                            setnewsTag(row.tag);
                            setnewsCover(row.coverImage);
                            setnewsID(row._id);
                            setUpdateModalOpen(true);
                            setDeleteNews(false);
                          }}
                        />{" "}
                        <DeleteIcon
                          style={{ fontSize: 35 }}
                          onClick={() => {
                            setDeleteNews(true);
                            setUpdateModalOpen(true);
                            setnewsID(row._id);
                          }}
                        />{" "}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {updateModalOpen && (
        <UpdateNewsletterModal
          newsTag={newsTag}
          newsTitle={newsTitle}
          newsDescription={newsDescription}
          newsCover={newsCover}
          modalVisible={updateModalOpen}
          NID={newsID}
          deleteNews={deleteNews}
          setModalVisible={setUpdateModalOpen}
        />
      )}

      {addNewItemOpen && <AddNewNewsletter />}
    </div>
  );
};

export default AdminNewsletter;
