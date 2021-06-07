import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useStyle } from "../styles";
import { Store } from "../Store";
import { addToOrder, removerFromOrder } from "../Actions/actions";
import Logo from "../components/Logo";

const ReviewScreen = (props) => {
  const styles = useStyle();
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const { state, dispatch } = useContext(Store);

  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } =
    state.order;

  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    removerFromOrder(dispatch, product);
    setIsOpen(false);
  };
  const procedToCheckoutHandler = () => {
    props.history.push('/select-payment');
  };

  return (
    <Box className={[styles.root]}>
      <Box className={[styles.main, styles.navy, styles.center]}>
        <Dialog open={isOpen} maxWidth={true} onClose={closeHandler}>
          <DialogTitle className={styles.center}>
            Remove / Add {product.name}
          </DialogTitle>
          <Box className={[styles.row, styles.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity == 1}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
            </Button>
            <TextField
              inputProps={{ className: styles.largeInput }}
              InputProps={{
                bar: true,
                inputProps: {
                  className: styles.largeInput,
                },
              }}
              className={styles.largeNumber}
              type="number"
              variant="filled"
              min={1}
              value={quantity}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddIcon />
            </Button>
          </Box>

          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => cancelOrRemoveFromOrder()}
              variant="contained"
              color="primary"
              size="large"
              className={styles.largButton}
            >
              {orderItems && orderItems.find((x) => x.name === product.name)
                ? "Remove From Order"
                : "Cancel"}
            </Button>

            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => addToOrderHandler()}
              variant="contained"
              color="primary"
              size="large"
              className={styles.largeButton}
            >
              Add To Order
            </Button>
          </Box>
        </Dialog>
        <Box className={[styles.center, styles.column]}>
          <Logo large></Logo>
          <Typography
            gutterButton
            className={styles.title}
            variant="h3"
            component="h3"
          >
            Review My {orderType} Order
           
          </Typography>
          <Grid container>
            {orderItems &&
              orderItems.map((item) => (
                <Grid item md={12} key={item._id}>
                  <Card
                    className={styles.card}
                    onClick={() => productClickHandler(item)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Box className={[styles.row, styles.between]}>
                          <Typography
                            gutterButton
                            className={styles.title}
                            variant="body2"
                            color="textPrimary"
                            component="p"
                          >
                            {item.name}
                          </Typography>
                          <Button variant = "contained">Edit</Button>
                        </Box>
                        <Box className={[styles.row, styles.between]}>
                        <Typography
                            gutterButton
                            className={styles.title}
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                           {item.calories} Cal
                          </Typography> 
                          <Typography
                            gutterButton
                            className={styles.title}
                            variant="body2"
                            color="textPrimary"
                            component="p"
                          >
                            <strong>R</strong> {item.quantity} x {item.price}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box>
          <Box className={[styles.bordered, styles.space]}>
            My Order - {orderType} | Tax : R{taxPrice} : Total : R{totalPrice} |
            Items : {itemsCount}
          </Box>
          <Box className={[styles.row, styles.around]}>
            <Button
              onClick={() => {
                props.history.push(`/order`);
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Back
            </Button>

            <Button
              onClick={procedToCheckoutHandler}
              variant="contained"
              color="secondary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Proceed To Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ReviewScreen;
