import "./App.css";
import NavBar from "./components/Books/NavBar";
import BooksHome from "./components/Books/booksHome";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

function App() {
  return (
    <Provider store={Store}>
      <NavBar />
      <BooksHome />
    </Provider>
  );
}

export default App;
