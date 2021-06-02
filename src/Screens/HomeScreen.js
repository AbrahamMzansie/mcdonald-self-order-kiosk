import React from "react";

import { useStyle } from "../styles";
import Logo from "../components/Logo";


import TouchAppIcon from '@material-ui/icons/TouchApp';
import { Box, Card, CardActionArea, Typography } from "@material-ui/core";

const HomeScreen = (props) => {
  const styles = useStyle();
  return (
    <Card>
      <CardActionArea onClick = {()=>props.history.push("/choose")}>
        <Box className={[styles.root, styles.red]}>
          <Box className={[styles.main, styles.center]}>
            <Typography component="h6" variant="h6">
              Fast & Easy
            </Typography>
            <Typography component="h1" variant="h1">
              Order <br /> Pay <br /> here
            </Typography>
            <TouchAppIcon fontSize="large"></TouchAppIcon>
          </Box>
          <Box className={[styles.center, styles.green]}>
            <Logo large></Logo>
            <Typography variant="h5" component="h5">
              Touch To Start
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default HomeScreen;
