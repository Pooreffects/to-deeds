interface DropIndicatorProps {
  beforeId: string;
  column: string | null;
}

export default function DropIndicator({
  beforeId,
  column,
}: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className='my-0.5 h-1 w-full bg-indigo-400/50 opacity-0'
    />
  );
}
