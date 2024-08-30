import type { APIRoute } from "astro";

import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dvxeoteja',
    api_key: '655379599582588',
    api_secret: 'UQAH1RGVrfDKhIsehklTevGpQ0c'
})

const uploadStream = async (buffer: Uint8Array, options: {
    folder: string
}): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary
            .uploader
            .upload_stream(options, (error, result) => {
                if (result) return resolve(result);
                reject(error);
            }).end(buffer);
    })
}

export const POST: APIRoute = async ({ request}) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (file == null) {
        return new Response("No file found", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const unir8Array = new Uint8Array(arrayBuffer);

    const result = await uploadStream(unir8Array, {
        folder: 'pdf'
    });

    const {
        asset_id: id,
        securel_url: url,
        pages
    } = result;

    return new Response(JSON.stringify({
        id,
        url,
        pages
    }));
};      