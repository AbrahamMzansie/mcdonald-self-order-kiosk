import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect } from "react";
import { createOrder } from "../Actions/actions";
import Logo from "../components/Logo";
import { Store } from "../Store";
import { useStyle } from "../styles";

const CompleteOrderScreen = (props) => {
  const styles = useStyle();
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;
  

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [order]);
  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
          <Link to = "/"><Logo large></Logo></Link>
        
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h3"
              component="h3"
            >
              Your Order has been placed
            </Typography>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h1"
              component="h1"
            >
              Thank you
            </Typography>
            <Typography
              gutterBottom
              className={styles.title}
              variant="h3"
              component="h3"
            >
              {`Your Order number is ${newOrder.number}`}
            </Typography>
            <Button
              onClick={()=>props.history.push("/")}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Order Again
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CompleteOrderScreen;
