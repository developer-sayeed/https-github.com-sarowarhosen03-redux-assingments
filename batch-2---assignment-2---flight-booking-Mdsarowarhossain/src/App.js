import { Provider } from "react-redux";
import "./App.css";
import FlightBokking from "./components/FlightBokking";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <FlightBokking />
      </div>
    </Provider>
  );
}

export default App;
