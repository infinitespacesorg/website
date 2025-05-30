import ElseHeaderWrapper from "@/components/header/else-nav/wrapper";
import FooterWithContactWrapper from "@/components/footer/footer-with-contact-us-wrapper";

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ElseHeaderWrapper />
      <div className="pt-15 min-h-[80vh]">{children}</div>
      <FooterWithContactWrapper />
    </>
  );
}
