export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='min-h-screen min-w-screen flex items-center justify-center bg-surface-dim px-4'>
        <div className='max-w-md w-full bg-surface rounded-3xl p-8'>
          {children}
        </div>
      </main>
    </>
  );
}
