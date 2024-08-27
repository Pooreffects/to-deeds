import { useState } from 'react';
import { ColumnType } from '../interfaces/board';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import DeedForm from './DeedForm';
import useKanban from '../hooks/useKanban';

interface AddDeedProps {
  column: ColumnType;
}

export default function AddDeed({ column }: AddDeedProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { createDeed } = useKanban();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;
    try {
      await createDeed(title.trim(), description.trim(), column.id);
    } finally {
      setIsAdding(false);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <>
      {isAdding ? (
        <DeedForm
          mode='add'
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          setIsAdding={setIsAdding}
          handleAdd={handleAdd}
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
