import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles((theme) => ({
  largeLogo: {
    height: "100px",
    marginTop : "20px",
    marginBottom : "20px"
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
    margin: "10px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  main: {
    flex: 1,
    overFlow: "auto",
    flexDirection: "column",
    display: "flex",
    color: "#ffffff",
   
    padding : "10px"
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
  navy: {
    backgroundColor: "#003080",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spacer: {
    padding: 10,
  },
  card: {
    margin: 10,
  },
  title: {
    margin: 18,
  },
  media: {
    width: "200px!important",
  },
  largeButton: {
    width: 200,
  },
  largeInput: {
    width: "60px!important",
    padding: "0!important",
    fontSize: "35px!important",
    textAlign: "center!important",
  },
  bordered: {
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
    borderStyle: "solid",
  },
  row: {
    display: "flex",
    padding: 10,
    justifyContent: "space-between",
  },
  around: {
    justifyContent: "space-around",
  },
  between: {
    justifyContent: "space-between",
  },
  column : {
    flexDirection : "column"
  }
}));
