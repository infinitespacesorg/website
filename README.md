# Schema UI - Next.js Sanity Starter Template

This starter is a part of [Schema UI](https://schemaui.com) project, a comprehensive page builder that provides production-ready React components with pre-built Sanity schemas and GROQ queries, enabling rapid development of content-driven websites with Sanity CMS and Next.js.

![Screenshot of Sanity Studio using Presentation Tool to do Visual Editing](https://cdn.sanity.io/images/a03xrv11/production/e83fee6a672a9df53548878eccddc0f962d1cac8-1920x931.webp)

[![Next.js][next-js]][next-js-url] [![Sanity][sanity]][sanity-url] [![React][react]][react-url] [![Typescript][typescript]][typescript-url] [![Tailwind][tailwind]][tailwind-url] [![Shadcn][shadcn]][shadcn-url]

[Docs](https://schemaui.com/docs) | [Components](https://schemaui.com/docs/components) | [Demo](https://starter.schemaui.com)

## Getting Started

#### 1. Clone this repo, install dependencies, and add environment variables

```bash
npm install
```

Environment variables are stored in an .env.local file in the root of the project. Contact Steve for values for the keys in the .env.local.example file.

#### 2. Run the template locally

Start the development servers:

```bash
pnpm dev
```

OR 

```bash
npm run dev
```

#### 3. Open the app and sign in to the Studio

- Open the Next.js app at [http://localhost:3000](http://localhost:3000)
- Open the Studio running locally in your browser on [http://localhost:3000/studio](http://localhost:3000/studio). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

### Adding content with Sanity

#### 1. Publish your first document

The template comes pre-defined with a schema containing `Author`, `Category`, `FAQ`, `Page`, `Post`, and `Testimonial` document types.

We have added documents for most of these types by now, but here's an example of how to add a document:

From the Studio, click "+ Create" and select the `Page` document type. Go ahead and create and publish the document.

Your content should now appear in your Next.js app ([http://localhost:3000](http://localhost:3000))

#### 2. Extending the Sanity schema

The schema for the `Page` document type is defined in the `sanity/schemas/document/page.ts` file. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

Here are the steps that Mason has taken to add a custom document:

- Create a new .ts file for your document in the sanity/schemas/documents folder; feel free to copy from an existing document as a reference.

- Add the document type to the array of types in the sanity/schema.ts file

- Add the document as an "orderableDocumentListDeskItem" in the sanity/structure.ts file

#### 4. Adding new components

This template includes all components from the [Schema UI](https://schemaui.com/docs/components) library.

Here are the steps that Mason has taken to add a custom component / block:

- Create a new .ts file for your block in the sanity/schemas/blocks folder; feel free to copy from an existing document as a reference.

- Create a new query for your block in the sanity/queries folder; query "_type" = block "name"

- Add the block to the array of blocks defined in sanity/schemas/documents/page.ts (if you want to use this block on a page)

- Add the block type to the array of types in the sanity/schema.ts file

- Run these two commands to update the schema.json file with JSON about the new block, and to update the sanity.types.ts file with a type for the new block:

```bash
npx sanity schema extract
npx sanity typegen generate
```

- Create a component in app/components that will render the component on the front end  

### Deploying your application

This website is deployed through Netlify, set up with preview deployments accessible whenever you create a new Pull Request. 

Whenever a pull request is merged to the main branch, a new site is built and deployed to Netlify, and any changes to the /sanity folder are deployed to our Sanity Studio.

A GitHub Action also merges any changes to the main branch to our playground repo, /website-playpen.

## Environment variables

All environment variables and their descriptions (again, talk to Steve for the values):

- `NEXT_PUBLIC_SITE_URL` - your website url. For example, `https://yourwebsite.com` without trailing slash.
- `NEXT_PUBLIC_SITE_ENV` - specifies the environment type (development/production) and affects metadata configuration. Setting this to "development" prevents search engine indexing, which is useful for staging environments (e.g., `dev.yourwebsite.com`).
- `NEXT_PUBLIC_SANITY_API_VERSION` - your Sanity API version. You don't have to use specific dates, any past or present date is valid, and today's date will always give you the latest version - no need to check release history. For example: YYYY-MM-DD.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - your Sanity project ID. For example, abc12345.
- `NEXT_PUBLIC_SANITY_DATASET` - your Sanity dataset name. For example, production.
- `SANITY_API_READ_TOKEN` - your Sanity read token for Next.js to fetch data.
- `RESEND_API_KEY` - your RESEND api key for the newsletter form.
- `RESEND_AUDIENCE_ID` - your RESEND audience id for the newsletter form to store contacts.

[react-url]: https://reactjs.org/
[next-js-url]: https://nextjs.org/
[typescript-url]: https://www.typescriptlang.org/
[tailwind-url]: https://tailwindcss.com/
[shadcn-url]: https://ui.shadcn.com/
[sanity-url]: https://www.sanity.io/
[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[next-js]: https://img.shields.io/badge/Next.js-20232A?style=for-the-badge&logo=Next.js
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=319795
[shadcn]: https://img.shields.io/badge/shadcn/ui-20232A?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBjbGFzcz0iaC02IHctNiI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9Im5vbmUiPjwvcmVjdD48bGluZSB4MT0iMjA4IiB5MT0iMTI4IiB4Mj0iMTI4IiB5Mj0iMjA4IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiPjwvbGluZT48bGluZSB4MT0iMTkyIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjE5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIj48L2xpbmU+PC9zdmc+&logoColor=ffffff
[sanity]: https://img.shields.io/badge/Sanity-20232A?style=for-the-badge&logo=sanity&logoColor=F97316
