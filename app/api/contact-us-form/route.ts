import { supabase } from "@/lib/supabase/browser";

interface FormSubmission {
    name: string;
    email: string;
    website: string | null;
    message: string;
}

export const POST = async (request: Request) => {

    const allowedOrigins = ["https://infinitespaces.co", "https://infinitespaces.org", "http://localhost:3000"];

    const origin = request.headers.get("origin");

    if (!origin || !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    try {
        const body: FormSubmission = await request.json()

        const { name, email, website, message } = body;
        const submission = {
            name, email, website, message,
            created_at: new Date().toISOString(),
        };

        const { data, error } = await supabase.from('contact_us_submissions').insert(submission).select()

        if (error) throw error

        return Response.json({ success: true })
    } catch (error: any) {
        console.error("Error submitting form:", error)
        return Response.json({ error: "Error submitting the form" }, { status: 500 })
    }
}