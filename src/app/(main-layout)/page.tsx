import { HeroBanner } from './components/HeroBanner';
import { SessionDialog } from './components/SessionDialog';

export const dynamic = 'force-dynamic';
export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center p-4'>
      <HeroBanner />
      <SessionDialog />
      {/* <SessionManager /> */}
    </div>
  );
}
