export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='min-h-screen min-w-screen flex items-center justify-center bg-surface-dim px-4'>
        {children}
      </main>
    </>
  );
}
