import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import React, { useContext } from "react";
import { setPaymentType } from "../Actions/actions";
import Logo from "../components/Logo";
import { Store } from "../Store";
import { useStyle } from "../styles";

const PaymentScreen = (props) => {
  const { state, dispatch } = useContext(Store);
  const styles = useStyle();
  const selectHandler = (type) => {
    setPaymentType(dispatch, type);
    if (type === "Pay Here") {
      props.history.push("/payment");
    } else {
      props.history.push("/complete");
    }
  };
  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
      <Link to = "/"><Logo large></Logo></Link>
        <Typography
          gutterButton
          className={styles.title}
          variant="h3"
          component="h3"
        >
          Select Payment Type
        </Typography>
      </Box>
      <Box className={styles.cards}>
        <Card className={[styles.card, styles.space]}>
          <CardActionArea onClick={() => selectHandler("Pay Here")}>
            <CardMedia
              component="img"
              alt="Pay Here"
              image="/images/payhere.png"
              className={styles.media}
            ></CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h6"
                color="textPrimary"
                component="p"
              >
                PAY HERE
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={[styles.card, styles.space]}>
          <CardActionArea onClick={() => selectHandler("At Counter")}>
            <CardMedia
              component="img"
              alt="At Counter"
              image="/images/atcounter.png"
              className={styles.media}
            ></CardMedia>
            <CardContent>
              <Typography
                gutterBottom
                className={styles.title}
                variant="h6"
                color="textPrimary"
                component="p"
              >
                AT COUNTER
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default PaymentScreen;
