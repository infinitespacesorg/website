'use client'

import { UserProvider } from '@/context/UserContext'
import type { User } from '@supabase/supabase-js'

export default function ClientUserProvider({
  initialUser,
  children,
}: {
  initialUser: User | null
  children: React.ReactNode
}) {
  return <UserProvider initialUser={initialUser}>{children}</UserProvider>
}
