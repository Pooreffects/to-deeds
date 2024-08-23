import { useState } from 'react';
import { CardType, ColumnProps } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';
import Card from './Card';
import { highlightIndicator, clearHighlights } from '../utils/dragUtils';

export default function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) {
  const [active, setActive] = useState(false);

  /* Drag Handlers */
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: CardType) {
    e.dataTransfer.setData('cardId', card.id);
  }
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    highlightIndicator(e, column);
    setActive(true);
  }
  function handleDragLeave() {
    setActive(false);
    clearHighlights(column);
  }
  function handleDragEnd() {
    setActive(false);
    clearHighlights(column);
  }

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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? 'bg-neutral-700/30' : 'bg-neutral-800/20'
        }`}
      >
        {filteredCards.map((card) => {
          return (
            <Card key={card.id} {...card} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId='-1' column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
