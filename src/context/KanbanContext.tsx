import { createContext, useState, useEffect, ReactNode } from 'react';
import { DeedType, ColumnType } from '../interfaces/board';
import supabase from '../db/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

interface KanbanContextProps {
  columns: ColumnType[];
  deeds: DeedType[];
  createDeed: (title: string, description: string, columnId: number) => void;
  deleteDeed: (deedId: number) => void;
  setDeeds: (newDeeds: DeedType[]) => void;
}

const KanbanContext = createContext<KanbanContextProps | undefined>(undefined);

const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [deeds, setDeeds] = useState<DeedType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKanbanBoard = async () => {
      try {
        setLoading(true);
        const [fetchedColumns, fetchedDeeds] = await Promise.all([
          fetchColumns(),
          fetchDeeds(),
        ]);
        setColumns(fetchedColumns);
        setDeeds(fetchedDeeds);
      } catch (err) {
        setError('Failed to load Kanban data.');
        console.error('Error fetching Kanban data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeKanbanBoard();
  }, []);

  const fetchColumns = async (): Promise<ColumnType[]> => {
    const { data, error }: PostgrestResponse<ColumnType> = await supabase
      .from('columns')
      .select('*');

    if (error) throw new Error(error.message);
    return data || [];
  };

  const fetchDeeds = async (): Promise<DeedType[]> => {
    const { data, error }: PostgrestResponse<DeedType> = await supabase
      .from('cards')
      .select('*');

    if (error) throw new Error(error.message);
    return data || [];
  };

  const createDeed = async (
    title: string,
    description: string,
    columnId: number
  ) => {
    const newDeed: DeedType = {
      id: deeds.length + 1,
      title,
      description,
      created_at: new Date(),
      updated_at: null,
      columnId,
    };

    const { data, error } = await supabase
      .from('deeds')
      .insert(newDeed)
      .select()
      .single();
    if (error) {
      console.error('Error creating deed:', error.message);
      return;
    }

    setDeeds((prevDeeds) => [...prevDeeds, data]);
  };

  const deleteDeed = async (deedId: number) => {
    const { error } = await supabase.from('deeds').delete().eq('id', deedId);
    if (error) {
      console.error('Error deleting deed:', error.message);
      return;
    }
    setDeeds((prevDeeds) => prevDeeds.filter((deed) => deed.id !== deedId));
  };

  return (
    <KanbanContext.Provider
      value={{ columns, deeds, createDeed, deleteDeed, setDeeds }}
    >
      {error && <div>Error: {error}</div>}
      {loading ? <div>Loading...</div> : children}
    </KanbanContext.Provider>
  );
};

export { KanbanProvider, KanbanContext };
