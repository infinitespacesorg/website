export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="w-full py-15 flex flex-col gap-12 items-start">{children}</div>
    );
  }