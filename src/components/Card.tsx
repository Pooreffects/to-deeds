import { CardColumn } from '../interfaces/board';
import DropIndicator from './DropIndicator';

interface CardProps {
  title: string;
  id: string;
  column: CardColumn;
  handleDragStart: (e: React.DragEvent, id: string) => void;
}

export default function Card({
  title,
  id,
  column,
  handleDragStart,
}: CardProps) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable='true'
        onDragStart={(e) => handleDragStart(e, id)}
        className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
      >
        <p className='text-sm text-neutral-100'>{title}</p>
      </div>
    </>
  );
}
