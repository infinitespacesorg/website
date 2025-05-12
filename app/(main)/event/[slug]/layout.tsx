// app/event/layout.tsx
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
      {children}
      <FooterWithContactWrapper />
    </>
  );
}
