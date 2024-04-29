import React, { useEffect, useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const ImageRender = () => {
    const [imagesList, setImagesList] = useState([]);
    const supabase = useSupabaseClient();

    async function getImagesList() {
        try {
            const { data } = await supabase
                .storage
                .from('image-gallery')
                .list('Images');

            if (data !== null) {
                return data.map((image) => {
                    const { data: url } = supabase.storage.from('image-gallery').getPublicUrl(`Images/${image.name}`)
                    return {
                        name: image.name,
                        url: url.publicUrl
                    };
                });
            }

            console.log(data);

        } catch (error) {
            console.error('Error al obtener la lista de imágenes:', error.message);
            return [];
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            const images = await getImagesList();
            setImagesList(images);
        };

        fetchImages();
    }, []);

    return (
        <div className="flex justify-center items-center">
            <h1 className="w-10 bg-red-500">Hello World</h1>
            {imagesList.map((image) => (
                <img
                    className="w-5"
                    key={image.name}
                    src={image.url}
                    alt={image.name}
                />
            ))}
        </div>
    )
};