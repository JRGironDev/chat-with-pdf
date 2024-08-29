import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request}) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    console.log(file);

    // simulate delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return new Response("Hello, world!");
};