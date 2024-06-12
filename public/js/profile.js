document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            document.getElementById('user-name').innerText = data.username;
            document.getElementById('user-email').innerText = data.email;
            document.getElementById('user-interests').innerText = data.interests.join(', ');

            // Populate user posts
            const postsContainer = document.querySelector('.user-posts');
            postsContainer.innerHTML = '';
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <figure class="image is-4by3">
                        <img src="${post.imageUrl}" alt="Post Image">
                    </figure>
                    <p>${post.description}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch user data when the page loads
    fetchUserData();
});
