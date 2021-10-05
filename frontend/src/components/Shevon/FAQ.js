import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import axios from "axios";

const FAQ = () => {
  const [faqdata, setfaqdata] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/matrix/api/deliveryManager/getallcategory"
        );
        const data = response.data.FAQ;
        setfaqdata(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="mt-4 mx-16 py-6 px-10 rounded-xl  border-0  shadow-md bg-blueSapphire bg-opacity-10">
        <h6 className="ml-4 mt-2 mb-2 font-black text-3xl">FAQ</h6>
        <hr />
        <div className=" py-6 px-10">
          {faqdata.map(({ category, faq }) => (
            <Accordion
              style={{
                backgroundColor: "#6D7B8D",
                borderRadius: "20px  20px 20px 20px",
              }}
              className="mt-2"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-white mr-4 " />}
                aria-controls="panel1a-content"
                style={{ backgroundColor: "", borderRadius: "5px" }}
                className="border-0"
              >
                <div
                  variant="h6 "
                  className="py-3 text-white pl-10 text-xl font-black font-thinKidFont"
                >
                  {category}
                </div>
              </AccordionSummary>
              <Divider />

              <AccordionDetails className="bg-white ">
                <List
                  component="nav"
                  aria-label="mailbox folders"
                  style={{ width: "100%", height: "300px" }}
                  className="overflow-y-auto  "
                >
                  {faq.map((item, index) => (
                    <>
                      <ListItem
                        className="overflow-y-auto "
                        style={{ height: "150px" }}
                        key={index}
                      >
                        <ListItemText
                          style={{
                            color: "black",
                            fontWeight: "bold",
                          }}
                          secondary={item.answer}
                          primary={item.question}
                        ></ListItemText>
                      </ListItem>

                      <Divider />
                    </>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
