import React, { useState } from 'react';

const Photo = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            console.log('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/photo', {
                method: 'POST',
                body: formData,
            });

            // Handle the response as needed
            // console.log('Upload successful:', response);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>

            <div id="wrapper">
                {/* You may display uploaded images or other content here */}
            </div>
        </>
    );
};

export default Photo;
