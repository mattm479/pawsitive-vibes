document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;

    // Function to fetch and display posts
    const fetchPosts = async (page = 1) => {
        try {
            const response = await fetch(`/api/posts?page=${page}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const postsContainer = document.querySelector('.posts-container');
            postsContainer.innerHTML = ''; // Clear existing posts
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post', 'box');
                postElement.innerHTML = `
                    <figure class="image is-4by3">
                        <img src="${post.imageUrl}" alt="Post Image">
                    </figure>
                    <p>${post.description}</p>
                    <small>Posted by: <a href="profile.html?user=${post.userId}">${post.username}</a> on <span>${new Date(post.createdAt).toLocaleDateString()}</span></small>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Function to handle post creation
    const handlePostCreation = async (event) => {
        event.preventDefault();
        const postData = new FormData(event.target);
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: postData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            alert('Post created successfully');
            fetchPosts(); // Refresh posts
            closeModal();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    // Function to open the modal
    const openModal = () => {
        document.getElementById('post-modal').classList.add('is-active');
    };

    // Function to close the modal
    const closeModal = () => {
        document.getElementById('post-modal').classList.remove('is-active');
    };

    // Fetch posts when the page loads
    fetchPosts();

    // Handle post creation form submission
    document.getElementById('post-form').addEventListener('submit', handlePostCreation);

    // Handle pagination
    document.querySelector('.pagination-next').addEventListener('click', () => {
        currentPage += 1;
        fetchPosts(currentPage);
    });
    document.querySelector('.pagination-previous').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            fetchPosts(currentPage);
        }
    });

    // Event listeners for modal
    document.getElementById('create-post-button').addEventListener('click', openModal);
    document.querySelector('.modal .delete').addEventListener('click', closeModal);
    document.querySelector('.modal-background').addEventListener('click', closeModal);
    document.getElementById('cancel-button').addEventListener('click', closeModal);
});
