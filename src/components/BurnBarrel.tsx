import { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { DeedType } from '../interfaces/board';

interface BurnBarrelProps {
  setDeeds: React.Dispatch<React.SetStateAction<DeedType[]>>;
}

export default function BurnBarrel({ setDeeds }: BurnBarrelProps) {
  const [active, setActive] = useState(false);

  /* Handle Drag Functionalities */
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave() {
    setActive(false);
  }

  function handleDragEnd(e: React.DragEvent) {
    const deedIdString = e.dataTransfer.getData('deedId');
    const deedId = Number(deedIdString);

    setDeeds((prev) => prev.filter((deed) => deed.id !== deedId));
    setActive(false);
  }

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
      }`}
    >
      {active ? <FaFire className='animate-bounce' /> : <FiTrash />}
    </div>
  );
}
