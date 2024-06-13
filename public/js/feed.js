document.addEventListener('DOMContentLoaded', () => {
    // Function to open the modal
    const openModal = () => {
        document.getElementById('post-modal').classList.add('is-active');
    };

    // Function to close the modal
    const closeModal = () => {
        document.getElementById('post-modal').classList.remove('is-active');
    };

    // Event listeners for modal
    document.getElementById('create-post-button').addEventListener('click', openModal);
    document.querySelector('.modal .delete').addEventListener('click', closeModal);
    document.querySelector('.modal-background').addEventListener('click', closeModal);
    document.getElementById('cancel-button').addEventListener('click', closeModal);
});

// Function to handle post creation
const postFormHandler = async (event) => {
    event.preventDefault();

    const title = '';
    const content = document.querySelector("#post-content").value.trim();
    const image = document.querySelector("#post-media").value;
    const category = document.querySelector("input[name=interests]:checked").value;

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content, image, category }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/feed');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

document.querySelector("#post-form").addEventListener('submit', postFormHandler);
