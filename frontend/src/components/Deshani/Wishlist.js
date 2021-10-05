import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { Image } from "cloudinary-react";
import axios from "axios";


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Wishlist = () => {

  const [cusWishList, setCusWishList] = useState(null);
  const [emptyStorage, setEmptyStorage] = useState(true);
  const [proID, setProID] = useState("");
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [author,setAuthor] = useState("");
  const [weight,setWeight] = useState("");

  useEffect(() => {
    setEmptyStorage(true);
    const getCustomerData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(`http://localhost:6500/matrix/api/customer/getWishlist`, config)
        .then((res) => {
          console.log(res.data);
          setCusWishList(res.data.wishlist);
          setProID(res.data.wishlist.productID);
          setProductName(res.data.wishlist.proName);
          setUnitPrice(res.data.wishlist.unitPrice);
          setAuthor(res.data.wishlist.originalAuthor);
          setProductImage(res.data.wishlist.proImg);
          setProductDetails(res.data.wishlist.aboutBook);
          setWeight(res.data.wishlist.weight);
          setEmptyStorage(false);
        })
        .catch((err) => {
          alert("Error in order set : " + err);
        });
    };
    getCustomerData();
  }, []);

  const remove = async (wID) => {
    const id = wID;
    alert(wID);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const dt = {
      id,
    };

    await axios
      .put(
        "http://localhost:6500/matrix/api/customer/removeWishlistItem",
        dt,
        config
      )
      .then((res) => {
        alert("removed from wishlist");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const checkCart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios
      .get(`http://localhost:6500/matrix/api/customer/getCartItems`, config)
      .then((res) => {
        response(res.data.cart);
        console.log(res.data);
      })
      .catch((err) => {
        alert("Error occured -" + err);
      });
  };

  const response = (cartData) => {
    let alreadyOnCart = false;
    if (cartData !== null) {
      cartData.map((item) => {
        if (item.productID === proID) {
          alreadyOnCart = true;
          alert(
            "item allready in cart!! You can manage your order quantity on cart page :)"
          );
        }
      });
      if (alreadyOnCart === false) {
        addToCart();
      }
    }
  };


  const addToCart = async () => {
    let tot = unitPrice;
    let pImg = productImage;
    let pName = productName;
    let pDetails = productDetails;
    let pAuthor = author;
    let pWeight = weight;
    let id = proID;
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    let dataObject = {
      productID: id,
      price: tot,
      img: pImg,
      bName:pName,
      bAuthor:pAuthor,
      about:pDetails,
      weight:pWeight

    };

    await axios
      .put(
        "http://localhost:6500/matrix/api/customer/addToCart",
        dataObject,
        config
      )
      .then((res) => {
        alert("Item added to the Cart");
      })
      .catch((err) => {
        alert("Error occured! " + err);
      });
  };

    const classes = useStyles();
    return (
        <div className='flex w-full min-h-screen justify-center items-center '>
        <div className='flex flex-col space-y-6 bg w-full xl:max-w-6xl sm:max-w-xl md:max-w-3xl h-4/5 mt-3 mb-10 p-8 rounded-xl shadow-lg text-black bg-gamboge'>
        <h1 className='font-boldTallFont font-semibold text-4xl'>Wishlist</h1>
        {!emptyStorage && (
          <>
          {cusWishList.map((x) =>{
            return(
              <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
              <TableHead>
              <TableRow>
              <TableCell>
              <div className='flex bg-white max-h-32 w-28 mr-5'>
              <Image
              cloudName="grid1234"
              publicId={x.proImg}
              />
              </div>
              </TableCell>
              <TableCell align="right">{x.proName}</TableCell>
              <TableCell align="right">{x.unitPrice}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" aria-label="add to shopping cart" onClick={()=>{
                  checkCart();
                }}>
                    <AddShoppingCartIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                    <IconButton aria-label="delete" color="secondary" onClick={()=>{
                      remove(x._id);
                    }}>
                        <DeleteIcon />
                    </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          </Table>
          </TableContainer>
            );
          })}
          </>
        )}
        
        </div>
        </div>
    )
}

export default Wishlist
