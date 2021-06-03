import {
  Box,
  Grid,
  List,
  ListItem,
  Avatar,
  CircularProgress,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useContext, useState } from "react";
import { listCagories, listProducts } from "../Actions/actions";
import { useStyle } from "../styles";
import { Store } from "../Store";
import Logo from "../components/Logo";

const OrderScreen = () => {
  const styles = useStyle();
  const [categoryName, setCategoryName] = useState("");
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;
  console.log(state.productList);

  useEffect(() => {
    if (!categories) {
      listCagories(dispatch);
    } else {
      listProducts(dispatch, categoryName);
    }
  }, [dispatch,,categories, categoryName]);

  const categoryClickHandler = (name) => {
    setCategoryName(name);
    listProducts(dispatch, categoryName);
  };
  return (
    <Box className={styles.root}>
      <Box className={styles.main}>
        <Grid container>
          <Grid item md={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItem onClick={() => categoryClickHandler()} button>
                    <Logo logo></Logo>
                  </ListItem>
                  {categories.map((item) => (
                    <ListItem
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
              gutterBottom
              className={styles.title}
              variant="h2"
              component="h2"
            >
              {categoryName || "Main Menu"}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products &&
                products.map((product) => (
                  <Grid key={product._id} item md={4}>
                    <Card className={styles.card}>
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
                            R{" "}{product.price}
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
  );
};

export default OrderScreen;
