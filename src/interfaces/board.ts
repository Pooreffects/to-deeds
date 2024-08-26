export interface ColumnType {
  id: number;
  name: string;
  position: number;
  created_at: Date;
}

export interface DeedType {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date | null;
  columnId: number;
}
