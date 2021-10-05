import React,{useState} from 'react'
// import * as Yup from "yup";
import { Formik } from "formik";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";

// const validationSchema = Yup.object({
//   bookName: Yup.string().trim().required("Book Name is required"),
//   author:Yup.string().trim().required("Author is required"),
//   description:Yup.string().trim().required("Description is required"),
//   language: Yup.string().trim().required("Language is required"),

// })


const RequestBook = () => {

    const [bookName,setBookName] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [language,setLanguage] = useState("");

    const addRequestBookHandler = async() =>{
      const newRequestBook = {
        bookName,
        author,
        description,
        language
      };
      try{
          await axios
                .post(
                  "http://localhost:6500/matrix/api/customer/requestBook",
                  newRequestBook
                )
                .then((res)=>{
                  alert("Request for translation of book sent successfully");
                })
                .catch((err) =>{
                  alert(err);
                });
      }catch(error){
        alert("Error Occured-" + error);
      }
    };

    const handleChanges = (event) =>{
      setLanguage(event.target.value);
    };

    return (
        <div className='flex w-full min-h-screen justify-center items-center '>
        <div className='flex flex-col space-y-6 bg w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-3/4 mt-6 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge bg-opacity-75'>
        <h1 className='font-boldTallFont font-semibold text-4xl'>Request Translation Book</h1>
      
        <Formik
          initialValues={{ bookName: "", author: "", description:"", language:"" }}
        
          onSubmit={async (values) => {
            console.log(values);
            addRequestBookHandler();
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
                addRequestBookHandler();
              }}
            >
              <div className="flex flex-col mb-6 mr-12 ml-12">
                <div className="pb-6 md:pr-3 md:mb-0 w-full ">
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"bookName"}
                  >
                    Book Name :
                  </label>
                  <input
                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900   text-base`}
                    id="bookName"
                    type="text"
                    onChange={(e) =>{
                      setBookName(e.target.value);
                    }}
                   
                  />
                
                </div>
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                  <label
                    className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                    htmlFor={"author"}
                  >
                    Author :
                  </label>
                  <input
                  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900   text-base`}
                    id="author"
                    type="text"
                    onChange={(e) =>{
                      setAuthor(e.target.value);
                    }}
                  
                  />
                 
                 
                </div>
                <div className="pb-6 md:pr-3 md:mb-0 w-full">
                <label
                  className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                  htmlFor={"description"}
                >
                  Description :
                </label>
                <textarea
                className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900  text-base`}
                  id="description"
                  rows="4"
                  type="text-box"
                  onChange={(e) =>{
                    setDescription(e.target.value);
                  }}
                 
                  
                />
              
              </div>
              
              <FormLabel component="legend" className="block text-sm font-medium leading-149 mb-3 md:text-lg" style={{color:"black"}}>Language :</FormLabel>
              <RadioGroup aria-label="language" name="language" value={language} onChange={handleChanges}>
              <div className="pb-6 md:pr-3 md:mb-0 w-full grid grid-flow-col grid-cols-3 place-content-center" >
                <div>
                <FormControlLabel value="Sinhala" control={<Radio />} label="Sinhala"  className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900   text-base`}
       
                />
             
                </div>
              <div>
              <FormControlLabel value="Tamil" control={<Radio />} label="Tamil" className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900   text-base`} 
            />
              
            </div>
            <div>
            <FormControlLabel value="English" control={<Radio />} label="English" className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900   text-base`}
            />
    
          
            </div>
            
              </div>
              </RadioGroup>
              </div>
              <div className="text-center mb-6 md:mb-6">
                <button
                  type="submit"
                  className="focus:outline-none bg-gray-700 text-snow-900 text-base rounded border hover:border-transparent w-64 h-10 sm:w-80 sm:h-12 mb-40 text-white font-bold"
                  style={{ boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)" }}
                >
                  Submit
                </button>
              </div>
           
            </form>
          )}
          
        </Formik>
        </div>
        </div>
     
        
    )
}

export default RequestBook
