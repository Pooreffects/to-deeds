import { motion } from 'framer-motion';
import { FiPlus, FiEdit } from 'react-icons/fi';
import { handleInputChange } from '../utils/handleInputChange';

interface DeedFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsAdding?: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdd?: (e: React.FormEvent) => void;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit?: (e: React.FormEvent) => void;
  mode: 'add' | 'edit';
}

export default function DeedForm({
  title,
  setTitle,
  description,
  setDescription,
  setIsAdding,
  handleAdd,
  setIsEditing,
  handleEdit,
  mode,
}: DeedFormProps) {
  const inputSetters = { title: setTitle, description: setDescription };

  const handleClose = () => {
    if (mode === 'add' && setIsAdding) {
      setIsAdding(false);
    }
    if (mode === 'edit' && setIsEditing) {
      setIsEditing(false);
    }
  };

  return (
    <div>
      <motion.form
        layout
        onSubmit={mode === 'add' ? handleAdd : handleEdit}
        className='w-full flex flex-col gap-2 p-2 border border-dashed border-neutral-600 rounded'
      >
        <input
          autoFocus
          type='text'
          name='title'
          placeholder={mode === 'add' ? 'Add Deed' : 'Edit Deed'}
          value={title}
          onChange={(e) => handleInputChange(e, inputSetters)}
          className='w-full rounded-md bg-neutral-700/50 py-1 px-3 text-sm text-indigo-100 font-medium placeholder:font-normal tracking-wider placeholder:text-indigo-100/80 focus:outline-none focus:ring-1 focus:ring-indigo-300 transition-colors border border-neutral-600'
          maxLength={50}
        />
        <textarea
          name='description'
          value={description}
          onChange={(e) => handleInputChange(e, inputSetters)}
          placeholder={
            mode === 'add' ? 'Add new description' : 'Edit description'
          }
          className='w-full h-24 rounded-md bg-neutral-700/50 py-2 px-3 text-sm text-indigo-100 font-medium placeholder:font-normal tracking-wider placeholder:text-indigo-100/80 focus:outline-none focus:ring-1 focus:ring-indigo-300 transition-colors border border-neutral-600 resize-none'
          required
          maxLength={120}
        />

        <div className='mt-1.5 flex items-center justify-end gap-1.5'>
          <button
            type='button'
            onClick={handleClose}
            className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
          >
            Close
          </button>
          <button
            type='submit'
            className='flex items-center gap-1.5 rounded bg-indigo-100 px-2 py-1 text-xs text-neutral-950 hover:bg-indigo-300 hover:rounded-sm transition-all'
          >
            <span>{mode === 'add' ? 'Add' : 'Save Changes'}</span>
            {mode === 'add' ? <FiPlus /> : <FiEdit />}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
