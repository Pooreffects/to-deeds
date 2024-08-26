import Column from './Column';
import BurnBarrel from './BurnBarrel';
import useKanban from '../hooks/useKanban';

export default function KanbanBoard() {
  const { columns, deeds, createDeed, setDeeds } = useKanban();

  return (
    <div className='h-full w-full py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
      {columns.map((column) => {
        const filteredDeeds = deeds.filter(
          (deed) => deed.columnId === column.id
        );

        return (
          <Column
            key={column.id}
            name={column.name.charAt(0).toUpperCase() + column.name.slice(1)}
            column={column}
            headingColor={
              column.name === 'backlog'
                ? 'text-gray-400'
                : column.name === 'todo'
                ? 'text-pink-400'
                : column.name === 'doing'
                ? 'text-cyan-500'
                : 'text-purple-300'
            }
            deeds={filteredDeeds}
            createDeed={createDeed}
            setDeeds={setDeeds}
          />
        );
      })}
      <BurnBarrel setDeeds={setDeeds} />
    </div>
  );
}
