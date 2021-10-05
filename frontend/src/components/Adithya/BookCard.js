import React from "react";
import Card from "@material-ui/core/Card";
import { Image } from "cloudinary-react";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const BookCard = (props) => {
  return (
    <div
      className={`${props.shadow === "2xl" && "shadow-2xl"} 
      ${props.shadow === "xl" && "shadow-xl"}
      ${props.shadow === "lg" && "shadow-lg"}
      ${props.shadow === "md" && "shadow-md"}
      `}
    >
      <Card style={{ maxWidth: props.maxWidth | 250, height: 680 }}>
        <CardActionArea>
          {props?.imgSrc && (
            <Image
              style={{
                height: 400,
                width: props.maxWidth,
              }}
              cloudName="grid1234"
              publicId={props.imgSrc}
            />
            // <CardMedia
            //   style={{ height: props.imgHeight | 300 }}
            //   image={props.imgSrc}
            //   title="bookCardImage"
            // />
          )}

          <CardContent>
            {props?.title && (
              <Typography
                gutterBottom
                style={{ fontWeight: 600, fontSize: "1.2rem" }}
              >
                {props.title}
              </Typography>
            )}
            {props?.description && (
              <Typography variant="body2" color="textSecondary">
                <p className=" h-36 font-contentFont font-semibold overflow-ellipsis overflow-hidden">
                  {props.description}
                </p>
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions>
          {props?.label1 && (
            <Typography
              gutterBottom
              style={{
                fontWeight: 900,
                fontSize: "1.3rem",
                marginRight: "1vw",
              }}
            >
              Rs.{props.label1}
            </Typography>
          )}
          {props?.label2 && (
            <Typography
              variant="overline"
              display="block"
              gutterBottom
              style={{ fontWeight: 900 }}
              className="rounded-full bg-ferrariRed text-white px-2"
            >
              {props.label2}
            </Typography>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default BookCard;
