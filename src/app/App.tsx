import Column from '../components/Column/Column';
import Header from '../components/Header/Header';

export default function App() {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="mt-10 grid grid-cols-4 gap-x-2">
        <Column title="To-deed" />
        <Column title="In progress" />
        <Column title="Staged" />
        <Column title="Archived" />
      </main>
    </div>
  );
}
