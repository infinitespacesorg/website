"use client";

import dynamic from "next/dynamic";

const FooterWithContactUs = dynamic(() => import("@/components/footer/footer-with-contact-us"));

export default function FooterWithContactWrapper() {
  return <FooterWithContactUs />;
}
