document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to update button text
    function updateButtonText() {
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = 'Light';
        } else {
            themeToggle.textContent = 'Dark';
        }
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateButtonText();
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
        updateButtonText();
    });

    // Load projects dynamically if the projects container exists
    const projectsContainer = document.getElementById('projects');
    if (projectsContainer) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projects.forEach((project, index) => {
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project';
                    projectElement.innerHTML = `
                        <img src="project-image-${index + 1}.jpg" alt="Project Image" class="project-image">
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <a href="${project.link}" target="_blank">View Project</a>
                        </div>
                    `;
                    projectsContainer.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                projectsContainer.innerHTML = '<p>Error loading projects.</p>';
            });
    }

    // Load blog posts dynamically if the blog posts container exists
    const blogPostsContainer = document.getElementById('blog-posts');
    if (blogPostsContainer) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach((post, index) => {
                    const postElement = document.createElement('div');
                    postElement.className = 'blog-post';
                    postElement.innerHTML = `
                        <img src="post-image-${index + 1}.jpg" alt="Post Image" class="post-image">
                        <div class="post-content">
                            <h3>${post.title}</h3>
                            <p class="date">${post.date}</p>
                            <p>${post.excerpt}</p>
                            <a href="post.html?id=${index}">Read More</a>
                        </div>
                    `;
                    blogPostsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                blogPostsContainer.innerHTML = '<p>Error loading blog posts.</p>';
            });
    }

    // Function to remove HTML tags from a string
    function removeHtmlTags(str) {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    }
    const contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML = removeHtmlTags(contentElement.innerHTML);
    }
});
