import PointsDeck from './components/PointsDeck';
import { mockUsersFa, ParticipantsList } from './components/ParticipantsList';
import { StoriesList } from './components/StoriesList';
import { PokerTable } from './components/PokerTable';

export const dynamic = 'force-dynamic';
export default function SessionPage() {
  return (
    <section className='min-h-screen min-w-screen p-4 flex'>
      <ParticipantsList />
      <PokerTable participants={mockUsersFa} />
      <StoriesList />
      <PointsDeck />
    </section>
  );
}
