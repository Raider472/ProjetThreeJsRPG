import React from "react";

export function Menu() {
let menu = [
    {
        text: "Jouer",
        action: () => document.getElementById("mainMenu").classList.add("hidden")
    },
    {
        text: "Comment jouer",
        action: () => console.log("Comment jouer")
    }
]


  return (
    <>
      <img src="/bg/logop.png" className=" rounded-3xl" />
      <div className="space-x-5">
        {menu.map((item) => (
          <ButtonMenu key={item.text} text={item.text} action={item.action} />
        ))}
      </div>


    </>
  );
}


function ButtonMenu({text,action}) {
  return (
    <button onClick={action}
    className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-lg p-6
     text-center me-2 mb-2">
      {text}
    </button>
  );
}