import Header from './components/Header';

const links = ['Try', 'Go On', 'Whatever', 'Yoo'];
export default function App() {
  return (
    <main className='container mx-auto p-4 h-screen'>
      <Header links={links} />
    </main>
  );
}
