import { useState } from "react";

export function Inventaire() {
  let [showed, setShowed] = useState(false);

  // Function to toggle the 'showed' state
  const toggleShow = () => {
    setShowed(!showed);
  };

  return (
    <div>
      <BoutonInventaire onToggle={toggleShow} />
      <div
        className={`${
          showed ? "grid" : "hidden"
        } z-10 absolute bg-slate-600/30 w-full top-0 h-4/5 grid-cols-3`}
      >
        <Tier />
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

function BoutonInventaire({ onToggle }) {
  return (
    <div className="absolute top-0 left-0 z-20 bg-slate-50" onClick={onToggle}>
      <img src="/assets/backpack-ui.png" className="w-20" />
    </div>
  );
}

function Tier() {
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <Block />
          <Block />
          <Block />
          <Block />
        </div>
        <div>
          <img src="/assets/character-placeholder.png" alt="" />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function Block() {
  return (
    <div className="rounded-xl p-4 border-2 border-white inline-block bg-blue-500">
      sqdsq
    </div>
  );
}
