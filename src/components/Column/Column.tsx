import CardContainer from './CardContainer';
import { BiMessageSquareAdd } from 'react-icons/bi';

type ColumnProps = {
  title: string;
};

export default function Column({ title }: ColumnProps) {
  return (
    <div className="w-72 bg-white border-4 border-cyan-600 p-3 rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
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
    </div>
  );
}
