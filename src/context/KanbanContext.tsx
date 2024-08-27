import { createContext, useState, useEffect, ReactNode } from 'react';
import { DeedType, ColumnType } from '../interfaces/board';
import supabase from '../db/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';

interface KanbanContextProps {
  columns: ColumnType[];
  deeds: DeedType[];
  createDeed: (
    title: string,
    description: string,
    columnId: string
  ) => Promise<void>;
  updateDeed: (
    deedId: string,
    title: string,
    description: string,
    columnId: string
  ) => Promise<void>;
  deleteDeed: (deedId: string) => void;
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

  async function createDeed(
    title: string,
    description: string,
    columnId: string
  ): Promise<void> {
    const newDeed: Omit<DeedType, 'id'> = {
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
      columnId,
    };

    const { data, error } = await supabase
      .from('cards')
      .insert(newDeed)
      .select()
      .single();

    if (error) {
      console.error('Error creating deed:', error.message);
      return;
    }

    setDeeds((prevDeeds) => [...prevDeeds, data as DeedType]);
  }

  async function updateDeed(
    deedId: string,
    title: string,
    description: string,
    columnId: string
  ): Promise<void> {
    const bigIntID = Number(deedId);

    const updatedDeed: Partial<DeedType> = {
      title,
      description,
      columnId,
      updated_at: new Date(),
    };

    try {
      const { data, error } = await supabase
        .from('cards')
        .update(updatedDeed)
        .eq('id', bigIntID)
        .select()
        .single();

      if (error) {
        console.error('Error updating deed:', error.message);
        return;
      }

      if (data) {
        setDeeds((prevDeeds) =>
          prevDeeds.map((deed) =>
            deed.id === deedId ? (data as DeedType) : deed
          )
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error updating deed:', err.message);
      } else {
        console.error('An unknown error occurred while updating the deed.');
      }
    }
  }

  async function deleteDeed(deedId: string): Promise<void> {
    try {
      const bigIntID = Number(deedId);
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', bigIntID);

      if (error) {
        throw new Error(error.message);
      }

      setDeeds((prevDeeds) => {
        const updatedDeeds = prevDeeds.filter(
          (deed) => Number(deed.id) !== bigIntID
        );
        return updatedDeeds;
      });
    } catch (err) {
      console.error('Error deleting deed:', err);
    }
  }

  return (
    <KanbanContext.Provider
      value={{ columns, deeds, setDeeds, createDeed, updateDeed, deleteDeed }}
    >
      {error && <div>Error: {error}</div>}
      {loading ? <div>Loading...</div> : children}
    </KanbanContext.Provider>
  );
};

export { KanbanProvider, KanbanContext };
