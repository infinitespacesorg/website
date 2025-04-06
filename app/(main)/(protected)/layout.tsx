import { getUserOrRedirect } from "@/lib/getUserOrRedirect";

export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getUserOrRedirect();

    return <>{children}</>
}