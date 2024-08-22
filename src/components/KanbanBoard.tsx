import { useState } from 'react';
import { DEFAULT_CARDS } from '../constants';
import { Card } from '../interfaces/board';
import Column from './Column';
import BurnBarrel from './BurnBarrel';

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
      <BurnBarrel setCards={setCards} />
      
    </div>
  );
}
