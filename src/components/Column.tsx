import { useState } from 'react';
import { CardType, ColumnProps } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import AddCard from './AddCard';
import Card from './Card';

/* Types */

type IndicatorElement = HTMLElement;
interface NearestIndicator {
  offset: number;
  element: IndicatorElement;
}

export default function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) {
  const [active, setActive] = useState(false);

  /* Indicators and highlights */
  function highlightIndicator(e: React.DragEvent<HTMLDivElement>): void {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = '1';
  }

  function clearHighlights(els?: IndicatorElement[]): void {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      if (i instanceof HTMLElement) {
        i.style.opacity = '0';
      }
    });
  }
  function getNearestIndicator(
    e: React.DragEvent<HTMLDivElement>,
    indicators: IndicatorElement[]
  ): NearestIndicator {
    const DISTENCE_OFFSET = 50;

    const el = indicators.reduce<NearestIndicator>(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTENCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  }
  function getIndicators(): IndicatorElement[] {
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    ) as IndicatorElement[];
  }

  /* Drag Handlers */
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, card: CardType) {
    e.dataTransfer.setData('cardId', card.id);
  }
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  }
  function handleDragLeave() {
    setActive(false);
    clearHighlights();
  }
  function handleDragEnd() {
    setActive(false);
    clearHighlights();
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
