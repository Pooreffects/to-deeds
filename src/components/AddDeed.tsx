import { useState } from 'react';
import { DeedType, ColumnType } from '../interfaces/board';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DeedForm from './DeedForm';

interface AddDeedProps {
  column: ColumnType;
  createDeed: (newDeed: DeedType) => Promise<void>;
}

export default function AddDeed({ column, createDeed }: AddDeedProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newDeed: DeedType = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      created_at: new Date(),
      updated_at: new Date(),
      columnId: column.id,
    };

    createDeed(newDeed).finally(() => {
      setIsAdding(false);
      setTitle('');
      setDescription('');
    });
  };

  return (
    <>
      {isAdding ? (
        <DeedForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          setIsAdding={setIsAdding}
          handleSubmit={handleSubmit}
        />
      ) : (
        <motion.button
          layout
          className='w-full flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
          onClick={() => setIsAdding(true)}
        >
          <span>Add deed</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
}
