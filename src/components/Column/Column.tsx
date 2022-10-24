import CardContainer from './CardContainer';
import { BiMessageSquareAdd } from 'react-icons/bi';

type ColumnProps = {
  title: string;
};

export default function Column({ title }: ColumnProps) {
  return (
    <div className="w-72 bg-gray-200 border-4 border-cyan-600 p-3 rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold font-primaryFont text-cyan-600">
          {title}
        </h2>
        <span className="flex items-center gap-x-1 hover:cursor-pointer">
          {/* Imon prolly create a translate-x text effect on icon hover
            - <h3 className="text-sm font-medium text-cyan-700">Add</h3>
          */}
          <BiMessageSquareAdd className="text-cyan-700 text-xl hover:scale-110 transform transition-transform" />
        </span>
      </div>
      <CardContainer deed="Work on Lamsa Collection" />
      <CardContainer deed="Work on Lamsa Collection" />
      <CardContainer deed="Work on Lamsa Collection" />
      <CardContainer deed="Work on Lamsa Collection" />
      <CardContainer deed="Work on Lamsa Collection" />
      <CardContainer deed="Work on Lamsa Collection" />
      <button
        className="w-full bg-cyan-600 text-center p-1 px-3 mb-3  rounded-xl hover:rounded  hover:cursor-pointer hover:border-none hover:bg-cyan-500 scale-90 hover:scale-100 transform transition-all duration-100 flex items-center justify-between"
        type="button"
      >
        <span className="text-base font-primaryFont font-semibold text-slate-100">
          add a deed
        </span>
        <BiMessageSquareAdd className="text-slate-100 text-xl hover:scale-110 transform transition-transform" />
      </button>
    </div>
  );
}
