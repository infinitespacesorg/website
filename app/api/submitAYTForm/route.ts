import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: process.env.SANITY_AUTH_TOKEN,
});

interface FormSubmission {
    firstName: string;
    lastName: string;
    location: string;
    creativeType: string;
    album2025: string;
}

export const POST = async (request: Request) => {
    try {
        const body: FormSubmission = await request.json()
        const { firstName, lastName, location, creativeType, album2025 } = body;
        const doc = {
            _type: "formSubmission",
            firstName,
            lastName,
            location,
            creativeType,
            album2025,
            submittedAt: new Date().toISOString(),
            status: "pending",
        };

        await client.create(doc)

        return Response.json({ success: true })
    } catch (error: any) {
        console.error("Error submitting form:", error)
        return Response.json({ error: "Error submitting the form" }, { status: 500 })
    }
}
