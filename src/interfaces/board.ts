export interface ColumnType {
  id: string;
  name: string;
  position: number;
  created_at: Date | string;
}

export interface DeedType {
  id: string;
  title: string;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
  columnId: string;
}
