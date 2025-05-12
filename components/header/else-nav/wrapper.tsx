"use client";

import dynamic from "next/dynamic";

const ElseHeader = dynamic(() => import("./index"));

export default function ElseHeaderWrapper() {
  return <ElseHeader />;
}
