export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="max-w-7xl py-15 flex flex-col gap-12 items-start">{children}</div>
    );
  }