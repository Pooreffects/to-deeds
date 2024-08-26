import React, { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { handleInputChange } from '../utils/handleInputChange';

interface DeedFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent) => void;
}

const DeedForm: React.FC<DeedFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  setIsAdding,
  handleSubmit,
}) => {
  const inputSetters = { title: setTitle, description: setDescription };

  return (
    <div>
      <motion.form
        layout
        onSubmit={handleSubmit}
        className='w-full flex flex-col gap-2 p-2 border border-dashed border-neutral-600 rounded'
      >
        <input
          autoFocus
          type='text'
          name='deed-title'
          placeholder='Add Deed'
          value={title}
          onChange={(e) => handleInputChange(e, inputSetters)}
          className='w-full rounded-md bg-neutral-700/50 py-2 px-3 text-base text-indigo-100 placeholder:text-indigo-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-neutral-600'
        />
        <textarea
          name='deed-description'
          value={description}
          onChange={(e) => handleInputChange(e, inputSetters)}
          placeholder='Add new description'
          className='w-full h-24 rounded-md bg-neutral-700/50 py-2 px-3 text-sm text-indigo-100 placeholder:text-indigo-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-neutral-600'
        />

        <div className='mt-1.5 flex items-center justify-end gap-1.5'>
          <button
            type='button'
            onClick={() => setIsAdding(false)}
            className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
          >
            Close
          </button>
          <button
            type='submit'
            className='flex items-center gap-1.5 rounded bg-neutral-50 px-2 py-1 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
          >
            <span>Add</span>
            <FiPlus />
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default DeedForm;
