import { cookies } from 'next/headers';
import SecretContent from './SecretContent';
import PasswordForm from './PasswordForm';

export default async function GateProtectedPage({ searchParams }: { searchParams?: { error?: string } }) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get('gate_auth')?.value === '1';

  if (authenticated) {
    return <SecretContent />;
  }
  return <PasswordForm searchParams={searchParams} />;
} 