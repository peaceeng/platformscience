import React, { useState } from "react";
import { calculateVowels, calculateConsonants } from "../utils/calculate";

export default function ({ title, values, setValues }) {
  const [currentValue, setCurrentValue] = useState("");

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      console.log(currentValue);
      if (currentValue.trim() === "") return;
      setValues((values) => [...values, currentValue]);
      setCurrentValue("");
    }
  };

  const deleteHandler = (index) => {
    const left = values.slice(0, index);
    const right = values.slice(index + 1);
    setValues([...left, ...right]);
  };

  return (
    <div className="edit-input">
      <h3>{title}</h3>
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={keyDownHandler}
      />
      <table style={{ width: 400 }}>
        <caption>{title}</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>Value</th>
            <th>Length</th>
            {title === "Drivers" ? (
              <>
                <th>Vowels</th>
                <th>Consonants</th>
              </>
            ) : (
              <th>Street Length</th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {values.map((item, index) => (
            <tr key={`${index}-${item}`}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>{item.length}</td>
              {title === "Drivers" ? (
                <>
                  <td>{calculateVowels(item)}</td>
                  <td>{calculateConsonants(item)}</td>
                </>
              ) : (
                <td>{item.split(",")[0].length}</td>
              )}
              <td>
                <span onClick={() => deleteHandler(index)}>X</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
