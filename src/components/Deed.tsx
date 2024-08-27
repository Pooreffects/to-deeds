import { useCallback, useMemo, useState } from 'react';
import { DeedType } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import { motion } from 'framer-motion';
import EditDeed from './EditDeed';

export interface DeedProps {
  id: string;
  title: string;
  description: string;
  created_at: string | Date;
  updated_at: string | Date;
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
  const [isEditing, setIsEditing] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const formattedCreatedAt = useMemo(() => {
    return new Date(created_at).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }, [created_at]);

  const handleDoubleClick = useCallback(() => {
    if (isEditing) return;
    if (clickTimeout) clearTimeout(clickTimeout);

    const timeout = setTimeout(() => {
      setIsEditing(true);
    }, 200);

    setClickTimeout(timeout);
  }, [isEditing, clickTimeout]);

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (isEditing) return;
      handleDragStart(e, {
        id,
        title,
        description: description || '',
        created_at: new Date(created_at).toString(),
        updated_at,
        columnId,
      });
    },
    [
      id,
      title,
      description,
      created_at,
      updated_at,
      columnId,
      handleDragStart,
      isEditing,
    ]
  );

  return (
    <>
      <DropIndicator beforeId={id} column={columnId || null} />
      <motion.div
        layoutId={id}
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        draggable={!isEditing}
        onDragStart={(e) =>
          handleDrag(e as unknown as React.DragEvent<HTMLDivElement>)
        }
        onDoubleClick={handleDoubleClick}
        className='cursor-grab rounded border select-text border-neutral-700 bg-neutral-800 my-1 p-3 active:cursor-grabbing'
      >
        {isEditing ? (
          <EditDeed
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            columnId={columnId}
            deedId={id}
          />
        ) : (
          <>
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
          </>
        )}
      </motion.div>
    </>
  );
}
