import "./App.css";
import MintButton from "./components/MintButton";
import "./components/NFTList";
import NFTList from "./components/NFTList";

function App() {
  return (
    <>
      <h2>Bloxima Technical Task</h2>

      <NFTList />

      <MintButton />
    </>
  );
}

export default App;
