"use client";
import {
  author_price,
  author_pro_price,
  reader_price,
  reader_pro_price,
  spiceFee,
} from "@/constants";
import React from "react";

interface MainInputProps {
  author: number;
  setAuthor: React.Dispatch<React.SetStateAction<number>>;
  authorPro: number;
  setAuthorPro: React.Dispatch<React.SetStateAction<number>>;
  reader: number;
  setReader: React.Dispatch<React.SetStateAction<number>>;
  readerPro: number;
  setReaderPro: React.Dispatch<React.SetStateAction<number>>;
  spice: number;
  setSpice: React.Dispatch<React.SetStateAction<number>>;
}

const MainInput: React.FC<MainInputProps> = ({
  author,
  setAuthor,
  authorPro,
  setAuthorPro,
  reader,
  setReader,
  readerPro,
  setReaderPro,
  spice,
  setSpice,
}) => {
  // Handle input change
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(+event.target.value);
    };

  return (
    <div className="flex gap-4 mb-6">
      {/* Author Input */}
      <div className="flex flex-col items-center mx-2">
        <label className="text-sm font-medium text-slate-600 mb-1">
          Author ({author_price}$)
        </label>
        <input
          type="number"
          value={author}
          onChange={handleChange(setAuthor)}
          placeholder="Enter author"
          className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-1.5 transition focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm"
        />
      </div>

      {/* AuthorPro Input */}
      <div className="flex flex-col items-center mx-2">
        <label className="text-sm font-medium text-slate-600 mb-1">
          Author Pro ({author_pro_price}$)
        </label>
        <input
          type="number"
          value={authorPro}
          onChange={handleChange(setAuthorPro)}
          placeholder="Enter authorPro"
          className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-1.5 transition focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm"
        />
      </div>

      {/* Reader Input */}
      <div className="flex flex-col items-center mx-2">
        <label className="text-sm font-medium text-slate-600 mb-1">
          Reader ({reader_price}$)
        </label>
        <input
          type="number"
          value={reader}
          onChange={handleChange(setReader)}
          placeholder="Enter reader"
          className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-1.5 transition focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm"
        />
      </div>

      {/* ReaderPro Input */}
      <div className="flex flex-col items-center mx-2">
        <label className="text-sm font-medium text-slate-600 mb-1">
          Reader Pro ({reader_pro_price}$)
        </label>
        <input
          type="number"
          value={readerPro}
          onChange={handleChange(setReaderPro)}
          placeholder="Enter readerPro"
          className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-1.5 transition focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm"
        />
      </div>

      {/* Spice Input */}
      <div className="flex flex-col items-center mx-2">
        <label className="text-sm font-medium text-slate-600 mb-1">
          SPICE ({spiceFee}$ / GB)
        </label>
        <input
          type="number"
          value={spice}
          onChange={handleChange(setSpice)}
          placeholder="Enter SPICE"
          className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-1.5 transition focus:outline-none focus:border-slate-500 hover:border-slate-400 shadow-sm"
        />
      </div>
    </div>
  );
};

export default MainInput;
