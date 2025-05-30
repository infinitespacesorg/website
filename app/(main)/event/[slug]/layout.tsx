import ElseHeaderWrapper from "@/components/header/else-nav/wrapper";
import FooterWithContactWrapper from "@/components/footer/footer-with-contact-us-wrapper";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ElseHeaderWrapper />
      <div className="pt-15 md:pt-0 min-h-[80vh]">{children}</div>
      <FooterWithContactWrapper />
    </>
  );
}
