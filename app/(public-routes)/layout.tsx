export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>Public route</div>
      {children}
    </>
  );
}
