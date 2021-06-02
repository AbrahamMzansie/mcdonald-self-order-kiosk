import {
  Box,
  Grid,
  List,
  ListItem,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useContext } from "react";
import { listCagories } from "../Actions/actions";
import { useStyle } from "../styles";
import { Store } from "../Store";
import Logo from "../components/Logo";

const OrderScreen = () => {
  const styles = useStyle();
  const { state, dispatch } = useContext(Store);
  const { categories, loading, error } = state.categoryList;
  console.log(state.categoryList);
  useEffect(() => {
    listCagories(dispatch);
  }, [dispatch]);
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
                <ListItem button>
                    <Logo logo></Logo>
                </ListItem>
                {
                    categories.map((item) => (
                        <ListItem button key={item.name}>
                          <Avatar alt={item.name} src={item.image}></Avatar>
                        </ListItem>
                      ))
                }
                </>
              )}
            </List>
          </Grid>
          <Grid item md={10}>
            Food List
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderScreen;
