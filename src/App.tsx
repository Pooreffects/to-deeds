import KanbanBoard from './components/KanbanBoard';
import { KanbanProvider } from './context/KanbanContext';

export default function App() {
  return (
    <main className='p-4 h-screen'>
      <KanbanProvider>
        <KanbanBoard />
      </KanbanProvider>
    </main>
  );
}
