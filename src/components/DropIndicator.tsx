interface DropIndicatorProps {
  beforeId: string;
  column: string;
}

export default function DropIndicator({
  beforeId,
  column,
}: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className='my-0.5 h-[1px] w-full bg-sky-600 opacity-0'
    />
  );
}
