document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form'); // Select the form element

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form); // Create FormData object from the form
        console.log(formData);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json(); // Parse JSON response
                alert('Blog post saved successfully!');
                window.location.href = '/blog'; // Redirect to the blog list page or wherever you want
            } else {
                const errorData = await response.json(); // Parse JSON response
                alert('Error saving blog post: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error sending request:', error);
            alert('An error occurred while saving the blog post.');
        }
    });
});
