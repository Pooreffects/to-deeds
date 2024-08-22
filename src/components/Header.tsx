interface headerProps {
  links: string[];
}

export default function Header({ links }: headerProps) {
  return (
    <header className='w-full flex items-center justify-between p-4'>
      <h1 className='font-semibold text-slate-200'>To Deeds</h1>
      <ul className='text-indigo-200 font-semibold cursor-pointer flex items-center justify-end gap-x-4'>
        {links.map((link) => (
          <li>{link}</li>
        ))}
      </ul>
    </header>
  );
}
