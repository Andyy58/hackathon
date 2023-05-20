import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";

function App() {
  const [accounts, setAccounts] = useState([]); // Update/Changes

  const [prevScrollPos, setPrevScrollPos] = useState(0); // Track scrolling
  const [visible, setVisible] = useState(true); // Set NavBar visibility

  const handleScroll = () => {
    // Sets nav to visible if scrolling up
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    // Adds event listener for scrolling
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <div className="overlay">
      <div className="App">
        <NavBar
          visible={visible}
          accounts={accounts}
          setAccounts={setAccounts}
        />{" "}
        {/* Prop Drilling*/}
        <Home />
        {/* <MainMint accounts={accounts} setAccounts={setAccounts}/> { Prop Drilling} } */}
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
