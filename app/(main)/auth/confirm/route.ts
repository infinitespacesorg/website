import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// this one handles password resets, only that for now I think?
// JUST KIDDING IT ALSO HANDLES THE RESEND EMAIL TEMPLATE NOW

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/account'
    if (token_hash && type) {
        const cookieStore = await cookies()

        const supabase = await createSupabaseServerClient(cookieStore);

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            // redirect user to specified redirect URL or root of app
            redirect(next)
        }
    }
    // redirect the user to an error page with some instructions
    redirect('/auth/auth-code-error')
}