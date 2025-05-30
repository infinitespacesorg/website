import Header from "@/components/header/index-nav";
import Footer from "@/components/footer/footer";
import Custom404 from "@/components/404";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <Custom404 />
      <Footer />
    </>
  );
}
