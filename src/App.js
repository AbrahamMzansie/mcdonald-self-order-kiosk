import {
  CssBaseline,
  MuiThemeProvider,
  Container,
  Paper,
  createMuiTheme,
} from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ChooseScreen from "./Screens/ChooseScreen";
import OrderScreen from "./Screens/OrderScreen";
import ReviewScreen from "./Screens/ReviewScreen";
import SelectPaymentScreen from "./Screens/SelectPaymentScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import CompleteOrderScreen from "./Screens/CompleteOrderScreen";

const theme = createMuiTheme({
  typography: {
    h1: { fontWeight: "bold" },
    h2: {
      fontSize: "2rem",
      color: "black",
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "white",
    },
  },
  palette: {
    primary: { main: "#ff1744" },
    secondary: {
      main: "#118e16",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <Container maxWidth="md">
          <Paper>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/choose" exact component={ChooseScreen}></Route>
            <Route path="/order" exact component={OrderScreen}></Route>
            <Route path="/review" exact component={ReviewScreen}></Route>
            <Route
              path="/select-payment"
              exact
              component={SelectPaymentScreen}
            ></Route>
            <Route path="/payment" exact component={PaymentScreen}></Route>
            <Route path="/complete" exact component={CompleteOrderScreen}></Route>
          </Paper>
        </Container>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
