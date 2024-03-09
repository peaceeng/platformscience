import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Edit from "./components/Edit";
import { DescriptionText } from "./utils/description";
import { assignDestinationsToDrivers } from "./utils/calculate";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [streets, setStreets] = useState([]);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(-1);

  const clickHandler = () => {
    if (drivers.length === 0 || streets.length === 0) {
      alert("Input drivers and strees information");
      return;
    }
    if (drivers.length !== streets.length) {
      alert("Length of drivers and streets must be the same!");
      return;
    }
    const { totalSS, assignedPairs } = assignDestinationsToDrivers(
      drivers,
      streets
    );
    setTotal(totalSS);
    setResults(assignedPairs);
    console.log(totalSS, assignedPairs);
  };

  return (
    <div className="App">
      <div>
        <h1>Welcome to Platform Science Code Challenge!!!</h1>
        <DescriptionText />
      </div>
      <div className="control">
        <button onClick={clickHandler}>Calculate</button>
        {total > 0 && (
          <>
            <h2>Total: {total}</h2>
            {results.map((item) => (
              <p>
                {item.driver} {`->`}
                {item.destination} : <b>{item.ss}</b>
              </p>
            ))}
          </>
        )}
      </div>
      <div className="edit-components">
        <Edit title="Drivers" values={drivers} setValues={setDrivers} />
        <Edit title="Streets" values={streets} setValues={setStreets} />
      </div>
    </div>
  );
}

export default App;
