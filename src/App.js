import "../src/index.css";
import Screeen from "./components/Screeen";
import Button from "./components/Button";
import { useState } from "react";

// an array of buttons  which are displayed and gtheir values

const buttonValues = [
  ["C", "^", "%", "/"],
  ["7", "8", "9", "X"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  [".", "0", "<", "="],
];

const App = () => {
  const [calc, setCalc] = useState({ num: "", res: "", sign: "" });

  const signClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: "",
    });
  };

  const numberClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num.length < 15) {
      setCalc({
        ...calc,
        num: calc.num + value,
      });
    }
  };

  const resultClick = (e) => {
    if (calc.sign && calc.num) {
      if (calc.sign !== "^") {
        const math = (a, b, sign) =>
          sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "X"
            ? a * b
            : a / b;

        setCalc({
          ...calc,
          res: math(Number(calc.res), Number(calc.num), calc.sign),
          sign: "",
          num: "",
        });
      } else {
        setCalc({
          ...calc,
          res: Math.pow(Number(calc.res), Number(calc.num)),
          sign: "",
          num: "",
        });
      }
    }
  };

  const resetClick = (e) => {
    e.preventDefault();
    setCalc({
      sign: "",
      res: "",
      num: "",
    });
  };

  const backClick = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      num: "",
    });
  };

  const percentageClick = (e) => {
    e.preventDefault();
    let num = calc.num ? calc.num : 0;
    let res = calc.res ? calc.res : 0;

    setCalc({
      ...calc,
      num: (num = num / Math.pow(100, 1)),
      res: (res = res / Math.pow(100, 1)),
      sign: "",
    });
  };

  const dotClick = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: calc.num + value,
    });
  };

  return (
    <div className="container">
      <Screeen value={calc.num ? calc.num : calc.sign} value1={calc.res} />
      <div className="buttonBox">
        {buttonValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === "="
                  ? "equals"
                  : btn === "+/-" ||
                    btn === "%" ||
                    btn === "X" ||
                    btn === "+" ||
                    btn === "-" ||
                    btn === "/" ||
                    btn === "^"
                  ? ""
                  : btn === "C" || btn === "<"
                  ? "operator"
                  : "number"
              }
              value={btn}
              onClick={
                btn === "+" ||
                btn === "-" ||
                btn === "X" ||
                btn === "/" ||
                btn === "^"
                  ? signClick
                  : btn === "="
                  ? resultClick
                  : btn === "C"
                  ? resetClick
                  : btn === "<"
                  ? backClick
                  : btn === "%"
                  ? percentageClick
                  : btn === "."
                  ? dotClick
                  : numberClick
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
