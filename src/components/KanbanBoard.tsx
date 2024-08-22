import { useState } from 'react';

// Define TypeScript interfaces for the card and column props
interface Card {
  title: string;
  id: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
}

interface ColumnProps {
  title: string;
  headingColor: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const DEFAULT_CARDS: Card[] = [
  {
    title: 'Fine-tune Pooreffects digital hub',
    id: '1',
    column: 'doing',
  },
  {
    title: 'Fine-tune Pooreffects digital hub',
    id: '2',
    column: 'doing',
  },
  {
    title: 'Spend time with fam and workout',
    id: '3',
    column: 'todo',
  },
  {
    title: 'Create content and network on LinkedIn',
    id: '4',
    column: 'todo',
  },
  {
    title: 'Prepare for Yassir interview',
    id: '5',
    column: 'done',
  },
];

export default function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);

  return (
    <div className='h-full w-full flex justify-center gap-3 overflow-hidden p-12'>
      <Column
        title='Backlog'
        column='backlog'
        headingColor='text-neutral-500'
        cards={cards}
        setCards={setCards}
      />
      <Column
        title='TODO'
        column='todo'
        headingColor='text-teal-300'
        cards={cards}
        setCards={setCards}
      />
      <Column
        title='In progress'
        column='doing'
        headingColor='text-sky-500'
        cards={cards}
        setCards={setCards}
      />
      <Column
        title='Complete'
        column='done'
        headingColor='text-emerald-200'
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
}

const Column: React.FC<ColumnProps> = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}) => {
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
      </div>
    </div>
  );
};
