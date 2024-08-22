import { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { Card } from '../interfaces/board';

interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export default function BurnBarrel({ setCards }: BurnBarrelProps) {
  const [active, setActive] = useState(false);
  return (
    <div
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
