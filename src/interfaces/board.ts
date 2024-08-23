export type CardColumnType = 'backlog' | 'todo' | 'doing' | 'done';
export interface ColumnProps {
  title: string;
  headingColor: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export interface CardType {
  title: string;
  id: string;
  column: CardColumnType;
}
