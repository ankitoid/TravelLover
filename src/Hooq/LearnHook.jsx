import React, { useState } from "react";

const LearnHook = () => {
  const [counter, setCounter] = useState(0);
  const addValue = () => {
    // console.log("addValue ",Math.random());
    // counter = counter + 1;
    setCounter(counter + 1);
    console.log("addValue ",setCounter);
  };
  const removeValue = () =>{
    if(counter > 0)
    setCounter(counter - 1);
  }
  return (
    <div className="max-w-7xl mx-auto items-center justify-center mt-10">
      <div className="flex flex-col items-center justify-center">

        <h1>learn hooks</h1>
        <h2>counter value : {counter}</h2>

      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          onClick={addValue}
          className="py-2 px-4 border-2 mt-2  hover:bg-yellow-400 rounded-2xl"
        >
          add value{" "}
        </button>
        <br />
        <button
        onClick={removeValue}
        className="py-2 px-4 border-2 hover:bg-amber-400 rounded-2xl">
          remove value{" "}
          {counter}
        </button>
      </div>
    </div>
  );
};

export default LearnHook;
