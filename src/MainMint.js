import { useEffect, useState } from "react";
import "./MainMint.css";
import { useParams } from "react-router-dom";

const MainMint = ({ accounts, setAccounts }) => {
  const { hash } = useParams();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [gas, setGas] = useState("");
  const [gasprice, setGasprice] = useState("");
  const [value, setValue] = useState("");
  const [transactions, setTransactions] = useState([]); // Array of transactions
  const [mintAmount, setMintAmount] = useState(1); // Determines the number of quantity the user is selecting to mint
  /* const isConnected = Boolean(accounts[0]); */
  const isConnected = accounts;

  useEffect(() => {
    if (hash === undefined) {
      setTransactions((ar) => {
        var cpy = [...ar];
        if (hash === undefined) {
          cpy.push(
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266;0x976ea74026e726554db657fa54763abd0c3a0aa9;21000;37461710066;100000000000000"
          );
          cpy.push(
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266;0x976ea74026e726554db657fa54763abd0c3a0aa9;21000;37461710066;100000000000000"
          );
          //generate more hashes like this format for me and add it to array
          cpy.push(
            "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266;0x976ea74026e726554db657fa54763abd0c3a0aa9;21000;37461710066;100000000000000"
          );
        }
        return cpy;
      });
    }
  }, [hash]);
  useEffect(() => {
    const parser = (s) => {
      if (s === undefined) return;
      var lst = s.split(";");
      var from = lst[0];
      var to = lst[1];
      var gas = lst[2];
      var gasPrice = lst[3];
      var value = lst[4];
      setFrom(from);
      setTo(to);
      setGas(gas);
      setGasprice(gasPrice);
      setValue(value);
    };
    parser(hash);
  }, [hash]);
  async function handleMint() {
    try {
      // const response = await contract.mint(BigNumber.mintAmount); // Solidity required
      // console.log("Response: ", response);
    } catch (err) {
      console.log("Error found: ", err);
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      {hash === "" || hash === undefined ? (
        <section className="main-mint">
          <h1>SentinelNet List</h1>
          <ul>
            {transactions.map((transaction) => (
              <li>
                <a href={`/mint/${transaction}`}>{transaction}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="main-mint">
          <h1>SentinelNet</h1>
          <p>Foolproof your transactions</p>
          <table>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Gas</th>
              <th>Gas Price</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>{from}</td>
              <td>{to}</td>
              <td>{gas}</td>
              <td>{gasprice}</td>
              <td>{value}</td>
            </tr>
          </table>
          <div>From: {from}</div>
          {isConnected ? (
            <div>
              <div>
                <button onClick={handleDecrement}>-</button>
                <input type="number" value={mintAmount}></input>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button onClick={handleMint}>Mint Now</button>
            </div>
          ) : (
            <p>You must be connected to Mint.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default MainMint; // Necessary for importing
