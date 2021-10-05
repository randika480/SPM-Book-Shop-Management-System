import React,{useState,useEffect} from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditProfileModal from "./EditProfileModal";
import EditPpModal from "./EditPpModal";
import DeleteProfileModal from "./DeleteProfileModal";
import { Image } from "cloudinary-react";
import axios from "axios";


const Profile = props => {

  const [editModalOpen,setEditModalOpen] = useState(false);
  const [editPpOpen,setEditPpOpen] = useState(false);
  const [deleteModalOpen,setDeleteModalOpen] = useState(false);


  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");
  const [phone,setPhone] = useState("");
  const [profilepic, setProfilePic] = useState(" ");
  useEffect(() =>{
        const getCustomer = async() =>{
          const config ={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
        };
        try{
          await axios
              .get("http://localhost:6500/matrix/api/customer/profile",config)
              .then((res) =>{
                setUserName(res.data.customer.username);
                setEmail(res.data.customer.email);
                setAddress(res.data.customer.address);
                setPhone(res.data.customer.phone);
                setProfilePic(res.data.customer.profilePicture.imagePublicId);
                console.log(res.data.customer.profilePicture.imagePublicId);
              })
              .catch((err) =>{
                alert("Error occured!!! :"+err);
              });
        }catch(error){
          alert("Error occured!!! : " + error)
        }
      };
      getCustomer();
  },[]);

    return (
        
        <div className='flex w-full min-h-screen justify-center items-center'>
        <div className='flex flex-col space-y-2 bg w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-4/5 mt-3 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge'>
        <h1 className='font-boldTallFont font-semibold text-4xl'>Profile</h1>
        <div className=" justify-center items-center w-40 ml-96" style={{marginLeft:"28rem"}}>
        <Image 
            className='w-40 h-40 mr-14 rounded-xl'
            cloudName="grid1234"
            publicId={profilepic}
        />
        
        </div>
         
        <List>
       
        <ListItem>
          <ListItemText
           primary={username}
            
          />
          
        </ListItem>
        <hr></hr>
        <ListItem>
          <ListItemText
          primary={email}
            
          />
          
        </ListItem>
        <hr></hr>
        <ListItem>
          <ListItemText
           
          primary={address}
          />
          
        </ListItem>
        <hr></hr>
        <ListItem>
          <ListItemText
           
          primary= {phone}
          />
         
        </ListItem>
        <hr></hr>
        </List>
        <div className='grid grid-flow-col grid-cols-3 '>
            <div>
            <Button variant="contained" color="primary" onClick={() => {
              setEditModalOpen(true);
            }}>
            Edit Details
          </Button>
          </div>
            <div>
            <Button variant="contained"  style={{width:"14rem", marginLeft:"-13rem"}} onClick={() =>{
              setEditPpOpen(true);
            }
            }>
            Update Profile Picture
            </Button>
            </div>
            <div>
            <Button
            variant="contained"
            color="secondary"
            style={{marginLeft:"-19.5rem"}}
            startIcon={<DeleteIcon />}
            onClick={() =>{
              setDeleteModalOpen(true);
            }
            }
          >  Delete
          </Button>
          </div>
        </div>
        
        </div>
        {editModalOpen && (
          <EditProfileModal
            modalVisible={editModalOpen}
            setModalVisible={setEditModalOpen}
            cusUsername={username}
            cusEmail={email}
            cusAddress={address}
            cusPhone={phone}
          />
        )}
        {editPpOpen && (
          <EditPpModal 
          modalVisible={editPpOpen}
          setModalVisible={setEditPpOpen}
         
          />
        )}
        {deleteModalOpen && (
          <DeleteProfileModal
          modalVisible={deleteModalOpen}
          setModalVisible={setDeleteModalOpen}
          />
        )
        }
        </div>
       
        


    )
}

export default Profile
