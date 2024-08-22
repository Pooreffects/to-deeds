import { useState } from 'react';
import { ColumnProps } from '../interfaces/board';
import Card from './Card';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';

export default function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) {
  const [active, setActive] = useState(false);

  // Filter cards based on the column
  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className='w-56 shrink-0'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className='rounded text-sm text-indigo-100'>
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${
          active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'
        }`}
      >
        {/* Map through filtered cards and render them here if needed */}
        {filteredCards.map((card) => {
          return <Card key={card.id} {...card} />;
        })}
        <DropIndicator beforeId='-1' column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
