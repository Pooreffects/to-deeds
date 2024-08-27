import { DeedType } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import { motion } from 'framer-motion';

export interface DeedProps {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: '';
  columnId: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, deed: DeedType) => void;
}

export default function Deed({
  title,
  id,
  columnId,
  description,
  created_at,
  updated_at,
  handleDragStart,
}: DeedProps) {
  const formattedCreatedAt = new Date(created_at).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <>
      <DropIndicator beforeId={id} column={columnId || null} />
      <motion.div
        layout
        layoutId={id}
        draggable='true'
        onDragStart={(e) =>
          handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, {
            id,
            title,
            description: description || '',
            created_at: new Date(created_at).toString(),
            updated_at,
            columnId,
          })
        }
        className='cursor-grab rounded border select-text border-neutral-700 bg-neutral-800 my-1 p-3 active:cursor-grabbing'
      >
        <div className='border-b border-neutral-500/50 mb-2 py-2 bg-neutral-600/20 rounded hover:bg-neutral-600/40 transition-colors'>
          <h2 className='text-md ml-2 font-semibold text-indigo-200'>
            {title}
          </h2>
        </div>
        <p className='pl-1 py-2 text-left text-base font-medium text-neutral-300 text-wrap'>
          {description}
        </p>
        <p className='pl-1 mt-1 text-xs text-neutral-500'>
          {formattedCreatedAt}
        </p>
      </motion.div>
    </>
  );
}
