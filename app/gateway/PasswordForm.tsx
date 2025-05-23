import { redirect } from 'next/navigation';

export default async function PasswordForm({ searchParams }: { searchParams?: URLSearchParams }) {
  const params = searchParams instanceof URLSearchParams ? searchParams : new URLSearchParams();
  const showError = params.get('error') === '1';
  return (
    <form method="POST" action="/api/gate-login">
      <h2>Password Required</h2>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        className="border rounded px-3 py-2 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
      >
        Enter
      </button>
      {showError && <p className="text-red-600 mt-2">Incorrect password</p>}
    </form>
  );
} 