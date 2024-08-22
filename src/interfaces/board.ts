export interface Card {
  title: string;
  id: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
}

export interface ColumnProps {
  title: string;
  headingColor: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}
