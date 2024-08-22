import { useState } from 'react';
import { Card, CardColumn } from '../interfaces/board';
import { FiPlus } from 'react-icons/fi';

interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export default function AddCard({ column, setCards }: AddCardProps) {
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim().length) return;

    const newCard = {
      column: column as CardColumn,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit} className='w-full'>
          <textarea
            onChange={(e) => setText(e.target.value)}
            name='add task'
            autoFocus
            placeholder='Add new task'
            className='w-full rounded border border-sky-700 bg-sky-500/10 p-3 text-sm text-neutral-300 placeholder-sky-500 focus:outline-0'
          />
          <div className='mt-1.5 flex items-center justify-end gap-1.5'>
            <button
              type='button'
              onClick={() => setAdding(false)}
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
        </form>
      ) : (
        <button
          className='w-full flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
          onClick={() => setAdding(true)}
        >
          <span>Add card</span>
          <FiPlus />
        </button>
      )}
    </>
  );
}
