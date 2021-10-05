import React, { useState } from "react";
import axios from "axios";

import * as Yup from "yup";
import { Formik } from "formik";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Hidden } from "@material-ui/core";
import PropagateLoader from "react-spinners/ScaleLoader";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Import React FilePond
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

const validationSchema = Yup.object({
  publishingTitle: Yup.string().trim().uppercase().required("Required"),
  originalTitle: Yup.string().trim().required("Required"),
  translator: Yup.string().trim(),
  originalAuthor: Yup.string().trim().required("Required"),
  aboutAuthor: Yup.string().trim().required("Required"),
  aboutBook: Yup.string().trim().required("Required"),
  category: Yup.string().trim().required("Required"),
  ISBN: Yup.string().trim().required("Required"),
  license: Yup.bool().required("Required"),
  quantity: Yup.number()
    .moreThan(999, "Print should have at least 1000 books")
    .required("Required"),
  edition: Yup.number()
    .positive("Invalid value")
    .integer("Invalid value")
    .required("Required"),
  translatorContact: Yup.number().required("Required"),
  translatorEmail: Yup.string().email().required("Required"),
  press: Yup.string().trim().required("Required"),
  proofReader: Yup.string().trim(),
  coverDesigner: Yup.string().trim(),
  typeSetter: Yup.string().trim(),
  weight: Yup.number().positive("Invalid value").required("Required"),
  marketPrice: Yup.number().positive("Invalid value").required("Required"),
  coverCost: Yup.number().when("coverDesigner", {
    is: (value) => !value,
    then: Yup.number(),
    otherwise: Yup.number().positive("Invalid value").required("Required"),
  }),
  licenseCost: Yup.number().when("license", {
    is: true,
    then: Yup.number().positive("Invalid value").required("Required"),
    otherwise: Yup.number(),
  }),
  writerPayment: Yup.number().positive("Invalid value").required("Required"),
  proofReadingPayment: Yup.number().when("proofReader", {
    is: (value) => !value,
    then: Yup.number(),
    otherwise: Yup.number().positive("Invalid value").required("Required"),
  }),
  typeSetterPayment: Yup.number().when("typeSetter", {
    is: (value) => !value,
    then: Yup.number(),
    otherwise: Yup.number().positive("Invalid value").required("Required"),
  }),
  printCost: Yup.number().positive("Invalid value").required("Required"),
  encImg: Yup.string().required("Required"),
});

const InventoryAddNew = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <div className=" mb-8 font-boldTallFont font-dark text-4xl">
          ADD NEW BOOK
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <Formik
          initialValues={{
            publishingTitle: "",
            originalTitle: "",
            translator: "",
            originalAuthor: "",
            aboutAuthor: "",
            aboutBook: "",
            ISBN: "",
            category: "",
            license: false,
            quantity: "",
            edition: "",
            translatorContact: "",
            translatorEmail: "",
            press: "",
            proofReader: "",
            coverDesigner: "",
            typeSetter: "",
            weight: "",
            marketPrice: "",
            coverCost: "",
            licenseCost: "",
            writerPayment: "",
            proofReadingPayment: "",
            typeSetterPayment: "",
            printCost: "",
            encImg: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
            await axios
              .post(
                "http://localhost:6500/matrix/api/inventoryManager/add-book",
                values,
                config
              )
              .then((res) => {
                setLoading(false);
                alert(res.data.desc);
                resetForm();
                setFile("");
              })
              .catch((err) => {
                setLoading(false);
                alert(err.response.data.desc);
              });
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setLoading(false);
                if (file[0] !== undefined) {
                  values.encImg = file[0].getFileEncodeDataURL();
                  handleSubmit();
                } else {
                  alert("Please Upload Cover Image");
                }
              }}
            >
              <Hidden only={["md", "lg", "xl"]}>
                <Grid item xs={12} md={3}>
                  <div>
                    <p className="font-fatKidFont text-xl">
                      COVER IMAGE UPLOAD
                    </p>
                    <hr className="border-lightSilver border-2 w-3/4 mb-4" />
                    <FilePond
                      files={file}
                      onupdatefiles={setFile}
                      allowMultiple={false}
                      allowFileEncode={true}
                      maxFiles={1}
                      name="files"
                      credits={false}
                      labelIdle='Upload book cover image<br />Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      allowFileTypeValidation={true}
                      acceptedFileTypes={["image/*"]}
                      labelFileTypeNotAllowed={
                        "Please import valid profile picture"
                      }
                      required
                      allowImagePreview
                      className="border rounded-2xl"
                      imagePreviewMinHeight={350}
                    />
                  </div>
                </Grid>
              </Hidden>
              <p className="font-fatKidFont text-xl">GENERAL DETAILS</p>
              <hr className="border-lightSilver border-2 w-3/4" />
              <div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-6 my-4">
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      label="Publishing Title"
                      id="publishingTitle"
                      fullWidth
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("publishingTitle")}
                      value={values.publishingTitle}
                    />
                    {errors.publishingTitle && touched.publishingTitle ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.publishingTitle}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Original Title"
                      id="originalTitle"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("originalTitle")}
                      value={values.originalTitle}
                    />
                    {errors.originalTitle && touched.originalTitle ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.originalTitle}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Translator (Optional)"
                      id="translator"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("translator")}
                      value={values.translator}
                    />
                    {errors.translator && touched.translator ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.translator}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="OriginalAuthor"
                      id="originalAuthor"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("originalAuthor")}
                      value={values.originalAuthor}
                    />
                    {errors.originalAuthor && touched.originalAuthor ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.originalAuthor}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="ISBN"
                      id="ISBN"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("ISBN")}
                      value={values.ISBN}
                    />
                    {errors.ISBN && touched.ISBN ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.ISBN}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Prints (Qut.)"
                      id="quantity"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("quantity")}
                      value={values.quantity}
                    />
                    {errors.quantity && touched.quantity ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.quantity}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Edition"
                      id="edition"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("edition")}
                      value={values.edition}
                    />
                    {errors.edition && touched.edition ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.edition}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                          labelId="category"
                          id="category"
                          value={values.category}
                          label="Age"
                          onChange={handleChange("category")}
                        >
                          <MenuItem value={"Novels"}>Novels</MenuItem>
                          <MenuItem value={"Historical"}>Historical</MenuItem>
                          <MenuItem value={"Literary"}>Literary</MenuItem>
                          <MenuItem value={"Military & Western"}>
                            Military &amp; Western
                          </MenuItem>
                          <MenuItem value={"Romance"}>Romance</MenuItem>
                          <MenuItem value={"Spiritual"}>Spiritual</MenuItem>
                          <MenuItem value={`Women's Fiction`}>
                            Women's Fiction
                          </MenuItem>
                          <MenuItem value={"Sci-Fi & Fantasy"}>
                            Sci-Fi &amp; Fantasy
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    {errors.category && touched.category ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.category}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Weight (g)"
                      id="weight"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("weight")}
                      value={values.weight}
                    />
                    {errors.weight && touched.weight ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.weight}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Press"
                      id="press"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("press")}
                      value={values.press}
                    />
                    {errors.press && touched.press ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.press}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Translator's Email"
                      id="translatorEmail"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("translatorEmail")}
                      value={values.translatorEmail}
                    />
                    {errors.translatorEmail && touched.translatorEmail ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.translatorEmail}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Translator's Contact no."
                      id="translatorContact"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("translatorContact")}
                      value={values.translatorContact}
                    />
                    {errors.translatorContact && touched.translatorContact ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.translatorContact}
                      </div>
                    ) : null}
                  </div>
                </Grid>
              </div>
              <p className="font-fatKidFont text-xl">COST DETAILS</p>
              <hr className="border-lightSilver border-2 w-3/4" />
              <div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-6 my-4">
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Retail Price"
                      id="marketPrice"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("marketPrice")}
                      value={values.marketPrice}
                    />
                    {errors.marketPrice && touched.marketPrice ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.marketPrice}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Print Cost"
                      id="printCost"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("printCost")}
                      value={values.printCost}
                    />
                    {errors.printCost && touched.printCost ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.printCost}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Proof Reader (optional)"
                      id="proofReader"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("proofReader")}
                      value={values.proofReader}
                    />
                    {errors.proofReader && touched.proofReader ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.proofReader}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Proof Reading Payment"
                      id="proofReadingPayment"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("proofReadingPayment")}
                      value={values.proofReadingPayment}
                    />
                    {errors.proofReadingPayment &&
                    touched.proofReadingPayment ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.proofReadingPayment}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Cover Designer (optional)"
                      id="coverDesigner"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("coverDesigner")}
                      value={values.coverDesigner}
                    />
                    {errors.coverDesigner && touched.coverDesigner ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.coverDesigner}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Cover Cost"
                      id="coverCost"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("coverCost")}
                      value={values.coverCost}
                    />
                    {errors.coverCost && touched.coverCost ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.coverCost}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Type Setter (optional)"
                      id="typeSetter"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("typeSetter")}
                      value={values.typeSetter}
                    />
                    {errors.typeSetter && touched.typeSetter ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.typeSetter}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Type Setter Payment"
                      id="typeSetterPayment"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("typeSetterPayment")}
                      value={values.typeSetterPayment}
                    />
                    {errors.typeSetterPayment && touched.typeSetterPayment ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.typeSetterPayment}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Writer Payment"
                      id="writerPayment"
                      type="number"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("writerPayment")}
                      value={values.writerPayment}
                    />
                    {errors.writerPayment && touched.writerPayment ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.writerPayment}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div>
                    <div className="flex lg:justify-center font-semibold">
                      <input
                        id="license"
                        type="checkbox"
                        onChange={handleChange("license")}
                        value={values.license}
                        className="w-6 h-6 m-2 mb-4"
                      />

                      <label className="my-auto">
                        License acquisition from original author?
                      </label>
                    </div>
                    {errors.license && touched.license ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.license}
                      </div>
                    ) : null}
                    {values.license && (
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="License Cost"
                        id="licenseCost"
                        type="number"
                        InputLabelProps={{
                          style: { fontWeight: 600 },
                        }}
                        onChange={handleChange("licenseCost")}
                        value={values.licenseCost}
                        size="small"
                        className="mt-2"
                      />
                    )}
                    {errors.licenseCost && touched.licenseCost ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.licenseCost}
                      </div>
                    ) : null}
                  </div>
                </Grid>
              </div>
              <p className="font-fatKidFont text-xl">PAGE CONTENT</p>
              <hr className="border-lightSilver border-2 w-3/4" />
              <div className="my-4">
                <Grid item xs={9}>
                  <div className="my-4">
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="About Author"
                      className="w-full"
                      id="aboutAuthor"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("aboutAuthor")}
                      value={values.aboutAuthor}
                      multiline
                      rows={6}
                    />
                    {errors.aboutAuthor && touched.aboutAuthor ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.aboutAuthor}
                      </div>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={9}>
                  <div className="mb-8">
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="About Book"
                      className="w-full"
                      id="aboutBook"
                      type="text"
                      InputLabelProps={{ style: { fontWeight: 600 } }}
                      onChange={handleChange("aboutBook")}
                      value={values.aboutBook}
                      multiline
                      rows={6}
                    />
                    {errors.aboutBook && touched.aboutBook ? (
                      <div className="text-ferrariRed font-black text-xs mt-1 md:text-sm">
                        {errors.aboutBook}
                      </div>
                    ) : null}
                  </div>
                </Grid>
              </div>
              <div className=" lg:my-10 md:my-9 sm:my-6">
                <button
                  type="submit"
                  className="focus:outline-none bg-gamboge font-semibold text-xl rounded py-3 px-12"
                  style={{
                    boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                  }}
                >
                  {!loading ? (
                    "SAVE"
                  ) : (
                    <PropagateLoader loading={loading} height={15} />
                  )}
                </button>
              </div>
              {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
            </form>
          )}
        </Formik>
      </Grid>
      <Hidden only={["xs", "sm"]}>
        <Grid item xs={12} md={3}>
          <div>
            <p className="font-fatKidFont text-xl">COVER IMAGE UPLOAD</p>
            <hr className="border-lightSilver border-2 w-3/4 mb-4" />
            <FilePond
              files={file}
              onupdatefiles={setFile}
              allowMultiple={false}
              allowFileEncode={true}
              maxFiles={1}
              name="files"
              credits={false}
              labelIdle='Upload book cover image<br />Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              allowFileTypeValidation={true}
              acceptedFileTypes={["image/*"]}
              labelFileTypeNotAllowed={"Please import valid profile picture"}
              required
              allowImagePreview
              className="border rounded-2xl"
              imagePreviewMinHeight={350}
            />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default InventoryAddNew;
