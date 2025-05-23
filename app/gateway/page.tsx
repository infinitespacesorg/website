import { cookies } from 'next/headers';
import SecretContent from './SecretContent';
import PasswordForm from './PasswordForm';

export default async function GateProtectedPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>
}) {
  const params = searchParams ? await searchParams : {};
  const cookieStore = await cookies();
  const authenticated = cookieStore.get('gate_auth')?.value === '1';

  if (authenticated) {
    return <SecretContent />;
  }
  return <PasswordForm error={params.error} />;
} 