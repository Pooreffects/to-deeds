import { AiFillCloseCircle, AiTwotoneEdit } from 'react-icons/ai';

type CardContainerProps = {
  deed: string;
};

export default function CardContainer({ deed }: CardContainerProps) {
  return (
    <div className="p-2 mb-3 border-[1.8px] rounded border-gray-400 hover:cursor-pointer hover:border-gray-500 hover:bg-gray-100 hover:scale-95 transform transition-transform flex items-center justify-between">
      <p className="text-base font-medium text-cyan-600">{deed}</p>
      <div className="flex items-center gap-x-1">
        <AiTwotoneEdit className="text-green-500 text-lg hover:cursor-pointer hover:-translate-y-1 hover:rotate-12 transform transition-transform" />
        <AiFillCloseCircle className="text-red-500 text-lg hover:cursor-pointer hover:-translate-y-1 transform transition-transform" />
      </div>
    </div>
  );
}
