import React,{useState,useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditReviewModal from './EditReviewModal';
import DeleteReviewModal from './DeleteReviewModal';
import { Image } from "cloudinary-react";
import axios from "axios";

const MyReview = () => {

    const [editModalOpen,setEditModalOpen] = useState(false);
    const [deleteModalOpen,setDeleteModalOpen] = useState(false);

    const [proID,setProID] = useState("");
    const [bookName,setBookName] = useState("");
    const [rating,setRating] = useState(0);
    const [comments,setComments] = useState("");
    const [reviewID,setReviewID] = useState("");
  
    const [reviews,setReviews] = useState([]);

    useEffect(() =>{
      const getReview = async()=>{
        const config ={
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        try{
          await axios
            .get("http://localhost:6500/matrix/api/customer/getReviews",config)
            .then((res)=>{
                setReviews(res.data.reviews)
                // for(let i=0; i<res.data.reviews.length;i++){
                //   console.log(res.data.reviews[i].productId);
                //   console.log(res.data.reviews[i].bookName);
                //   setProID(res.data.reviews[i].productId);
                //   setBookName(res.data.reviews[i].bookName);
                //   setRating(res.data.reviews[i].rating);
                //   setComments(res.data.reviews[i].comment);

                // }
            })
            .catch((err) =>{
              alert("Error occured!!! :"+err);
            });
        }catch(error){
          alert("Error occured!!! : " + error)
        }
      };
      getReview();
    },[]);
    return (
        <div className='flex w-full min-h-screen justify-center items-center '>
        <div className='flex flex-col space-y-6 bg w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-3/4 mt-6 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge'>
        <h1 className='font-boldTallFont font-semibold text-4xl'>My Reviews</h1>
 
         <div className="flex flex-col w-full lg:max-w-full lg:flex">
     
         {reviews.map((x) =>{
           return(
             <>
             <div className="flex flex-row mt-3">
  
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"  title="Mountain">
            <Image
            cloudName="grid1234"
            publicId={x.productId.bookImage.imagePublicId}
          />
            
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
             
              <div className="text-gray-900 font-bold text-xl mb-2">{x.bookName}</div>
              <Rating name="read-only" value={x.rating} readOnly />
              <p className="text-gray-700 text-base mb-10">{x.comment}</p>
              <Button variant="contained" color="primary" className="mr-20" onClick={() =>{
               setEditModalOpen(true);
               setReviewID(x._id);
               setProID(x.productId);
               setBookName(x.bookName);
               setRating(x.rating);
               setComments(x.comment);
             }} >
             Edit Rewiews
               </Button>
               <Button
               variant="contained"
               color="secondary"
               style={{marginLeft:"2rem"}}
               startIcon={<DeleteIcon />}
              onClick={()=>{
                setDeleteModalOpen(true);
                setReviewID(x._id);
              }} 
             >  Delete Reviews
             </Button>
            </div>
       
          </div>
       
          </div>
          </>
           );
         })}
       
       </div>    
        </div>
        {editModalOpen && (
          <EditReviewModal 
          modalVisible={editModalOpen}
          setModalVisible={setEditModalOpen}
          reviewID = {reviewID} 
          productID = {proID}
          bName = {bookName}
          rate = {rating}
          comments = {comments}
          />
        )}
        {deleteModalOpen && (
          <DeleteReviewModal
          modalVisible={deleteModalOpen}
          setModalVisible={setDeleteModalOpen}
          reviewID = {reviewID}
          />
        )
        }
        
         </div>
  
        
    )
}

export default MyReview
