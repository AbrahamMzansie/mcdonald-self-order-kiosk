import {
  Box,
  Grid,
  List,
  ListItem,
  Avatar,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {Link} from "react-router-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useContext, useState } from "react";
import {
  listCagories,
  listProducts,
  addToOrder,
  removerFromOrder,
  clearOrder,
} from "../Actions/actions";
import { useStyle } from "../styles";
import { Store } from "../Store";
import Logo from "../components/Logo";

const OrderScreen = (props) => {
  const styles = useStyle();
  const [categoryName, setCategoryName] = useState("");
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;

  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } =
    state.order;

  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  useEffect(() => {
    if (!categories) {
      listCagories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch, , categories, categoryName]);

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };
  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    removerFromOrder(dispatch , product);
    setIsOpen(false);
  };
  const previewOrderHandler = () => {
    props.history.push("/review");
  };

  return (
    <Box className={styles.root}>
       <Box className={styles.main}>
      <Dialog open={isOpen} maxWidth={true} onClose={closeHandler}>
        <DialogTitle className={styles.center}>Add {product.name}</DialogTitle>
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
           style = {{marginLeft : "10px"}}
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
      <Box className={styles.main}>
        <Grid container>
          <Grid classname = "main__category" item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItem className = "logo" onClick={() => categoryClickHandler()} button>
                  <Link to = "/"><Logo></Logo></Link>
                  </ListItem>
                  {categories.map((item) => (
                    <ListItem
                    className = "category"
                      onClick={() => categoryClickHandler(item.name)}
                      button
                      key={item.name}
                    >
                      <Avatar alt={item.name} src={item.image}></Avatar>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            <Typography
            style = {{textAlign : "center"}}
              gutterBottom
              className={styles.title}
              variant="h2"
              component="h2"
            >
              {categoryName || "Main Menu"}
            </Typography>
            <Grid  className = "product__list" container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products &&
                products.map((product) => (
                  <Grid key={product._id} item md={4}>
                    <Card
                      onClick={() => productClickHandler(product)}
                      className={styles.card}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={product.name}
                          image={product.image}
                          className={styles.media}
                        ></CardMedia>

                        <CardContent>
                          <Typography
                            gutterBottom
                            className={styles.title}
                            variant="body2"
                            color="textPrimary"
                            component="p"
                          >
                            {product.name}
                          </Typography>
                          <Box className={styles.cardFooter}>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {product.calories} Cal
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              R {product.price}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
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
                clearOrder(dispatch);
                props.history.push("/");
              }}
              variant="contained"
              color="primary"
              className={styles.largeButton}
            >
              Cancel Order
            </Button>
            <Button
              onClick={previewOrderHandler}
              variant="contained"
              color="primary"
              disabled={orderItems.length === 0}
              className={styles.largeButton}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderScreen;
