"use client";
import { useState } from "react";
import ChartDisplay from "@/components/ChartDisplay";
import MainInput from "@/components/MainInput";
import CapacityDisplay from "@/components/CapacityDisplay";

export default function Home() {
  // Lift the state to Home for better structure
  const [author, setAuthor] = useState(0);
  const [authorPro, setAuthorPro] = useState(0);
  const [reader, setReader] = useState(0);
  const [readerPro, setReaderPro] = useState(0);
  const [spice, setSpice] = useState(0);

  return (
    <div>
      <div className="flex justify-center border border-black mb-4">
        <h1 className="text-xl font-semibold p-4">QuickSight Cost Analysis</h1>
      </div>

      {/* Pass down state and setters to MainInput */}
      <div className="flex justify-center">
        <MainInput
          author={author}
          setAuthor={setAuthor}
          authorPro={authorPro}
          setAuthorPro={setAuthorPro}
          reader={reader}
          setReader={setReader}
          readerPro={readerPro}
          setReaderPro={setReaderPro}
          spice={spice}
          setSpice={setSpice}
        />
      </div>

      <div className="mb-5">
        {authorPro > 0 ? (
          <div className="flex justify-center text-red-400">
            {" "}
            * A $250/month per account Amazon Q enablement fee applies for
            accounts with at least one Pro user or with at least one Amazon Q
            Topic.
          </div>
        ) : (
          <></>
        )}
        {authorPro > 0 || author > 0 ? (
          <div className="flex justify-center text-green-400">
            {" "}
            Free SPICE for Author + Author Pro : {authorPro * 10 +
              author * 10}{" "}
            GB
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <ChartDisplay
          author={author}
          authorPro={authorPro}
          reader={reader}
          readerPro={readerPro}
          spice={spice}
        />

        <CapacityDisplay author={author} authorPro={authorPro} spice={spice} />
      </div>
      {/* Chart updates automatically when state changes */}
    </div>
  );
}
