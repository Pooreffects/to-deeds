import { CardColumnType, CardType } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import { motion } from 'framer-motion';

export interface CardProps {
  title: string;
  id: string;
  column: CardColumnType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
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
      <motion.div
        layout
        layoutId={id}
        draggable='true'
        onDragStart={(e) =>
          handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, {
            title,
            id,
            column,
          })
        }
        className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
      >
        <p className='text-sm text-neutral-100'>{title}</p>
      </motion.div>
    </>
  );
}
