import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
});

interface FormSubmission {
  firstName: string;
  lastName: string;
  location: string;
  creativeType: string;
  album2025: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { firstName, lastName, location, creativeType, album2025 }: FormSubmission = req.body;
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

    await client.create(doc);
    return res.status(200).json({ message: "Submission successful" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
