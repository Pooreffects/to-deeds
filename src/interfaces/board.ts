export interface Card {
  title: string;
  id: string;
  column: CardColumn;
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export type CardColumn = 'backlog' | 'todo' | 'doing' | 'done';
