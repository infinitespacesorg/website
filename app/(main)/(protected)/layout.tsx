import { getUserOrRedirect } from "@/lib/getUserOrRedirect";
import ElseHeaderWrapper from "@/components/header/else-nav/wrapper";
import FooterWithContactWrapper from "@/components/footer/footer-with-contact-us-wrapper";

// every page inside this (protected) folder use this Layout,
// and go through getUserOrRedirect so that they are redirected
// to Login if they try to access a page as an unauthenticated user

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  console.log('this?')

  await getUserOrRedirect();

  return (
    <>
      <ElseHeaderWrapper />
      <div className="pt-15 md:pt-0">{children}</div>
      <FooterWithContactWrapper />
    </>
  );
}
