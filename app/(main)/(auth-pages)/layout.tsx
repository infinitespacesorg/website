import ElseHeaderWrapper from "@/components/header/else-nav/wrapper";
import FooterWithContactWrapper from "@/components/footer/footer-with-contact-us-wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ElseHeaderWrapper />
      <div className="w-full pt-16 flex flex-col gap-12 items-start min-h-[67vh] md:min-h-[80vh]">
        {children}
      </div>
      <FooterWithContactWrapper />
    </>
  );
}
