import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const HomeBestSellers = () => {
  const [regularOrders, setRegularOrders] = useState(null);
  const [bulkOrders, setBulkOrders] = useState(null);

  const [display, setDisplay] = useState(false);
  const [topSelling, setTopSelling] = useState([]);

  const [products, setProducts] = useState(null);
  let productSales = [];

  useEffect(() => {
    const getProducts = async () => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getProducts")

          .then((res) => {
            setProducts(res.data.Products);
            let productIds = [];
            for (let i = 0; i < res.data.Products.length; i++) {
              let dataobject = {
                book: res.data.Products[i]._id,
                bookName: res.data.Products[i].publishingTitle,
                author: res.data.Products[i].translator,
                ISBN: res.data.Products[i].ISBN,
              };
              productIds.push(dataobject);
            }
            getRegularOrders(productIds);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        console.log("error :" + err);
      }
    };
    getProducts();

    const getRegularOrders = async (book) => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getRegularOrders")
          .then((res) => {
            setRegularOrders(res.data.orders);
            for (let j = 0; j < book.length; j++) {
              let count = 0;
              for (let i = 0; i < res.data.orders.length; i++) {
                for (let x = 0; x < res.data.orders[i].orderData.length; x++) {
                  if (res.data.orders[i].orderData[x].productID) {
                    if (
                      book[j].book ===
                      res.data.orders[i].orderData[x].productID._id
                    ) {
                      count += res.data.orders[i].orderData[x].quantity;
                    }
                  }
                }
              }
              const dataobject = {
                book: book[j].book,
                bookName: book[j].bookName,
                author: book[j].author,
                ISBN: book[j].ISBN,
                count: count,
              };

              productSales.push(dataobject);
            }
            getBulkOrders();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        console.log("error :" + err);
      }
    };

    const getBulkOrders = async () => {
      try {
        await axios
          .get("http://localhost:6500/matrix/api/admin/getBulkOrders")

          .then((res) => {
            for (let x = 0; x < productSales.length; x++) {
              let newCount = productSales[x].count;
              for (let i = 0; i < res.data.bulkorders.length; i++) {
                for (let j = 0; j < res.data.bulkorders[i].items.length; j++) {
                  if (res.data.bulkorders[i].items[j].productID) {
                    if (
                      productSales[x].book ===
                      res.data.bulkorders[i].items[j].productID._id
                    ) {
                      newCount += res.data.bulkorders[i].items[j].quantity;
                    }
                  }
                }
              }
              productSales[x].count = newCount;
            }

            setBulkOrders(res.data.bulkorders);
            getTopSellingItems();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        console.log("error :" + err);
      }
    };

    const getTopSellingItems = () => {
      for (let i = 0; i < productSales.length; i++) {
        for (let j = i + 1; j < productSales.length; j++) {
          let temp = 0;
          if (productSales[i].count < productSales[j].count) {
            temp = productSales[i];
            productSales[i] = productSales[j];
            productSales[j] = temp;
          }
        }
      }
      getBookData();
    };

    const getBookData = async () => {
      productSales.map(async (item, index) => {
        setDisplay(false);
        await axios
          .get(
            `http://localhost:6500/matrix/api/inventoryManager/get-book/${item.ISBN}`
          )
          .then((res) => {
            topSelling.push(res?.data?.book);
          })
          .catch((err) => {
            alert(err.response.data.desc);
          });

        if (index === 4) {
          setDisplay(true);
        }
      });
    };
  }, []);

  return (
    <>
      {display ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  lg:gap-6 md:gap-4 sm:gap-3">
          {topSelling.map((item) => {
            return (
              <div
                key={item.ISBN}
                onClick={() => {
                  window.location = `/book/${item.ISBN}`;
                }}
              >
                <BookCard
                  imgSrc={item.bookImage.imagePublicId}
                  title={item.publishingTitle}
                  description={item.aboutBook}
                  label1={item.marketPrice}
                  label2={item.discountPercentage.label}
                  maxWidth={400}
                  shadow="xl"
                />
              </div>
            );
          })}
        </div>
      ) : (
        "xxxx"
      )}
    </>
  );
};

export default HomeBestSellers;
