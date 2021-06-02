import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
  largeLogo: {
    height: "100px",
  },
  logo: {
    height: "50px",
  },
  red: {
    backgroundColor: "#ff2040",
    color: "#ffffff",
  },
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    overFlow: "auto",
    flexDirection: "column",
    display: "flex",
    color: "#ffffff",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  green: {
    backgroundColor: "#00b020",
  },
  navvy: {
    backgroundColor: "#003080",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
      padding : 10,
  },
  card: {
    margin: 10,
  },
  media : {
      width : 200,
  }
}));
