import React, { useContext } from "react";
import Logo from "../components/Logo";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from "@material-ui/core";
import { useStyle } from "../styles";
import { Store } from "../Store";
import { setOrderType } from "../Actions/actions";

const ChooseScreen = (props) => {
  const styles = useStyle();
  const { dispatch } = useContext(Store);

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    props.history.push("/order");
  };

  return (
    <Fade in={true}>
      <Box className={[styles.root, styles.navvy]}>
        <Box className={[styles.main, styles.center]}>
          <Logo large/>
          <Typography gutterBottom component="h3" variant="h3">
            Where you will be eating today ?
          </Typography>
          <Box className={styles.cards}>
            <Card
              onClick={() => chooseHandler("Eat In")}
              className={[styles.card, styles.space]}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  image="/images/eatin.png"
                  alt="Eat In"
                  component="img"
                ></CardMedia>
                <CardContent
                  gutterBottom
                  variant="h4"
                  color="textPrimary"
                  component="h4"
                >
                  Eat In
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              onClick={() => chooseHandler("Take Out")}
              className={[styles.card, styles.space]}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  image="/images/takeout.png"
                  alt="Take Out"
                  component="img"
                ></CardMedia>
                <CardContent
                  gutterBottom
                  variant="h4"
                  color="textPrimary"
                  component="h4"
                >
                  Take Out
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default ChooseScreen;
