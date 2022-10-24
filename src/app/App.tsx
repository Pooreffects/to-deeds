import Column from '../components/Column/Column';
import Header from '../components/Header/Header';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useState } from 'react';

export default function App() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="mt-10 grid grid-cols-4 gap-x-2">
        <Column title="To-deed" />
        <Column title="In progress" />
        <Column title="Staged" />
        {/* Extract the btn component*/}
        <button
          className="w-full h-8 bg-cyan-600 text-center p-1 px-3 my-2  rounded-xl  hover:cursor-pointer hover:border-none hover:bg-cyan-700 hover:translate-y-1 hover:rounded transition-all duration-100 flex items-center justify-between"
          type="button"
        >
          <span className="text-base font-primaryFont font-semibold text-slate-100">
            add a bucket
          </span>
          <BiMessageSquareAdd className="text-slate-100 text-xl hover:scale-110 transform transition-transform" />
        </button>
      </main>
    </div>
  );
}
