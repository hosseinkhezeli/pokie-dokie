import { HeroBanner } from './components/HeroBanner';
import { RecentSessions } from './components/RecentSessions';
import { SessionDialog } from './components/SessionDialog';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className='min-h-screen p-4'>
      <div className='flex flex-col !max-w-5xl w-[70vw] mx-auto gap-4'>
        <HeroBanner />
        <RecentSessions />
      </div>
      <SessionDialog />
    </div>
  );
}
