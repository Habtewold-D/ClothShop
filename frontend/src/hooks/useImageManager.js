import { useState } from 'react';

export const useImageManager = (initialImages = []) => {
    const [previews, setPreviews] = useState(initialImages);
    const [imageStates, setImageStates] = useState(() =>
        initialImages.map((url, index) => ({
            type: 'original',
            url: url,
            originalIndex: index
        }))
    );

    const addImages = (files) => {
        const newPreviewPromises = files.map(file => {
            const reader = new FileReader();
            return new Promise(resolve => {
                reader.onloadend = () => resolve({ url: reader.result, file });
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newPreviewPromises).then(results => {
            setPreviews(prev => [...prev, ...results.map(r => r.url)]);
            setImageStates(prev => [...prev, ...results.map(r => ({
                type: 'additional',
                file: r.file
            }))]);
        });
    };

    const replaceImage = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews(prev => {
                const next = [...prev];
                next[index] = reader.result;
                return next;
            });
            setImageStates(prev => {
                const next = [...prev];
                const originalIndex = next[index]?.originalIndex;
                next[index] = {
                    type: 'replaced',
                    file: file,
                    originalIndex: originalIndex
                };
                return next;
            });
        };
        reader.readAsDataURL(file);
    };

    const removeImage = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setImageStates(prev => prev.filter((_, i) => i !== index));
    };

    return {
        previews,
        imageStates,
        addImages,
        replaceImage,
        removeImage
    };
};
