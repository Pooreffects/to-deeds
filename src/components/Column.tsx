import { useState, Dispatch, SetStateAction } from 'react';
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

interface ColumnProps {
  name: string;
  headingColor: string;
  column: ColumnType;
  deeds: DeedType[];
  setDeeds: Dispatch<SetStateAction<DeedType[]>>;
  createDeed: (newDeed: DeedType) => Promise<void>;
}

export default function Column({
  name,
  headingColor,
  column,
  deeds,
  setDeeds,
  createDeed,
}: ColumnProps) {
  const [active, setActive] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, deed: DeedType) {
    e.dataTransfer.setData('deedId', deed.id.toString());
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    highlightIndicator(e, column.name);
    setActive(true);
  }

  function handleDragLeave() {
    setActive(false);
    clearHighlights(column.name);
  }

  function handleDragEnd(e: React.DragEvent<HTMLDivElement>) {
    setActive(false);
    clearHighlights(column.name);

    const deedId = Number(e.dataTransfer.getData('deedId'));
    const indicators = getIndicators(column.name);
    const { element } = getNearestIndicator(e, indicators);

    const before = Number(element.dataset.before || '-1');

    // Early return if no change in position
    if (before === deedId) return;

    setDeeds((prevDeeds) => {
      // Find the deed to transfer
      const deedToTransfer = prevDeeds.find((deed) => deed.id === deedId);

      // Early return if deed not found
      if (!deedToTransfer) return prevDeeds;

      // Remove the deed from its original position
      const updatedDeeds = prevDeeds.filter((deed) => deed.id !== deedId);

      // Determine the new position for the deed
      if (before === -1) {
        updatedDeeds.push({ ...deedToTransfer, columnId: column.id });
      } else {
        const insertIndex = updatedDeeds.findIndex(
          (deed) => deed.id === before
        );

        // Early return if the insert index is not found
        if (insertIndex === -1) return prevDeeds;

        updatedDeeds.splice(insertIndex, 0, {
          ...deedToTransfer,
          columnId: column.id,
        });
      }

      return updatedDeeds;
    });
  }

  const filteredDeeds = deeds.filter((deed) => deed.columnId === column.id);

  return (
    <div className='w-64 shrink-0'>
      <div className='px-3 mb-3 flex items-center justify-start gap-x-3'>
        <h3 className={`font-medium ${headingColor}`}>{name}</h3>
        <span className='font-semibold rounded-sm border border-neutral-600 px-1 text-sm text-indigo-100'>
          {filteredDeeds.length}
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
        {filteredDeeds.map((deed) => (
          <Deed
            key={deed.id}
            {...deed}
            handleDragStart={(e) => handleDragStart(e, deed)}
          />
        ))}
        <DropIndicator beforeId='-1' column={column.name} />
        <AddDeed column={column} createDeed={createDeed} />
      </div>
    </div>
  );
}
