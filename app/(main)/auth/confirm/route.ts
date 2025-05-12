import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// this one handles password resets, only that for now I think?
// JUST KIDDING IT ALSO HANDLES THE RESEND EMAIL TEMPLATE NOW

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const next = searchParams.get('redirect_to') ?? '/account'
    // const type = searchParams.get('type') as EmailOtpType | null
    const rawType = searchParams.get("type");
    const type: EmailOtpType | null =
        rawType === "email_change_new" ? "email_change" : (rawType as EmailOtpType | null);

    console.log(request.url)
    console.log(type)
    console.log(searchParams)
    console.log(next)

    if (token_hash && type) {

        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (error) {
            console.error('OTP verification error:', error.message)
            return redirect('/auth/auth-code-error')
        }
        if (!error) {
            // redirect user to specified redirect URL or root of app
            redirect(next)
        }
    }
    // redirect the user to an error page with some instructions
    redirect('/auth/auth-code-error')
}