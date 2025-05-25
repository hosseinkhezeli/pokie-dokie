import { Card } from '@/components/ui/card/Card';

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='min-h-screen min-w-screen flex items-center justify-center bg-surface-dim px-4'>
        <Card>{children}</Card>
      </main>
    </>
  );
}
