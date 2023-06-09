import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";
const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Header />
        <Main />
      </div>
    </main>
  );
};

export default App;
