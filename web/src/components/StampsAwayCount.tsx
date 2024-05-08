import { useState } from "react";

export default function StampsAwayCount({ height }: { height: number }) {
  const [stampsAway] = useState(5 - height);

  return (
    <div className="text-center text-xl">
      <p className="font-semibold text-4xl">{stampsAway}</p>
      <div className="flex flex-col text-center">
        <span>Stamps</span>
        <span>away from</span>
        <span>the next</span>
        <span>prize!</span>
      </div>
    </div>
  );
}
