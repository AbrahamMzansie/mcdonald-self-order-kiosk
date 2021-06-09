import React from "react";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { useStyle } from "../styles";
import Logo from "../components/Logo";
import {Link} from "react-router-dom";
const PaymentScreen = (props) => {
  const styles = useStyle();
  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
        <Link to = "/"><Logo large></Logo></Link>
          <Typography
            gutterBottom
            className={styles.title}
            variant="h3"
            component="h3"
          >
            Please follow the instruction on the PIN pad
          </Typography>
          <CircularProgress />
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button
         style = {{marginBottom : "20px"}}
          onClick={() => props.history.push("/complete")}
          variant="contained"
          color="primary"
          className={styles.largeButton}
        >
          Complete Order
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentScreen;
