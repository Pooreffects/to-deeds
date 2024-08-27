import { useState, useCallback } from 'react';
import { DeedType, ColumnType } from '../interfaces/board';
import DropIndicator from './DropIndicator';
import AddDeed from './AddDeed';
import Deed from './Deed';
import {
  highlightIndicator,
  clearHighlights,
  getIndicators,
  getNearestIndicator,
} from '../utils/dragUtils';
import useKanban from '../hooks/useKanban';

interface ColumnProps {
  name: string;
  headingColor: string;
  column: ColumnType;
  deeds: DeedType[];
}

export default function Column({
  name,
  headingColor,
  column,
  deeds,
}: ColumnProps) {
  const [active, setActive] = useState(false);
  const { setDeeds } = useKanban();

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, deed: DeedType) => {
      e.dataTransfer.setData('deedId', deed.id.toString());
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      highlightIndicator(e, column.name);
      setActive(true);
    },
    [column.name]
  );

  const handleDragLeave = useCallback(() => {
    setActive(false);
    clearHighlights(column.name);
  }, [column.name]);

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      setActive(false);
      clearHighlights(column.name);

      // Get the deed ID from dataTransfer as a string
      const deedId = e.dataTransfer.getData('deedId');
      const indicators = getIndicators(column.name);
      const { element } = getNearestIndicator(e, indicators);

      // Get 'before' value as a string
      const before = element.dataset.before || '-1';

      // Early return if no change in position
      if (before === deedId) return;

      // Find the deed to transfer
      const deedToTransfer = deeds.find((deed) => deed.id === deedId);
      if (!deedToTransfer) return;

      // Remove the deed from its original position
      const updatedDeeds = deeds.filter((deed) => deed.id !== deedId);

      // Determine the new position for the deed
      if (before === '-1') {
        // Insert at the end if before is '-1'
        updatedDeeds.push({ ...deedToTransfer, columnId: column.id });
      } else {
        // Find the correct index to insert the deed
        const insertIndex = updatedDeeds.findIndex(
          (deed) => deed.id === before
        );
        if (insertIndex === -1) return;

        updatedDeeds.splice(insertIndex, 0, {
          ...deedToTransfer,
          columnId: column.id,
        });
      }

      setDeeds(updatedDeeds);
    },
    [column.id, column.name, deeds, setDeeds]
  );

  return (
    <div className='w-64 shrink-0'>
      <div className='px-3 mb-3 flex items-center justify-start gap-x-3'>
        <h3 className={`font-medium ${headingColor}`}>{name}</h3>
        <span className='font-semibold rounded-sm border border-neutral-600 px-1 text-sm text-indigo-100'>
          {deeds.length}
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
        {deeds.map((deed) => (
          <Deed
            key={deed.id}
            {...deed}
            handleDragStart={(e) => handleDragStart(e, deed)}
          />
        ))}
        <DropIndicator beforeId='-1' column={column.name} />
        <AddDeed column={column} />
      </div>
    </div>
  );
}
