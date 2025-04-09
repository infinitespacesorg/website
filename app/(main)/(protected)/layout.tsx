import { getUserOrRedirect } from "@/lib/getUserOrRedirect";

// every page inside this (protected) folder use this Layout,
// and go through getUserOrRedirect so that they are redirected
// to Login if they try to access a page as an unauthenticated user

export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getUserOrRedirect();

    return <>{children}</>
}