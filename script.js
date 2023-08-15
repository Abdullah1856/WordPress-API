const endpoint = 'https://testwp1.braincrop.net/wp-json/wp/v2/posts';

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const postContainer = document.getElementById('post-container');

    data.forEach(post => {
      const box = document.createElement('a');
      box.classList.add('post-box');
      box.href = post.link;

      const title = document.createElement('h2');
      title.innerHTML = post.title.rendered;

      const excerpt = document.createElement('p');
      const maxLength = 50; // Set your desired word limit for the excerpt

      // Remove HTML tags and limit to desired word count
      const sanitizedExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '');
      const words = sanitizedExcerpt.split(' ');
      const limitedExcerpt = words.slice(0, maxLength).join(' ');

      excerpt.innerHTML = limitedExcerpt;

      const image = document.createElement('img');
      if (post.featured_media !== 0) {
        fetch(`https://testwp1.braincrop.net/wp-json/wp/v2/media/${post.featured_media}`)
          .then(response => response.json())
          .then(mediaData => {
            image.src = mediaData.source_url;
          });
      }

      box.appendChild(image);
      box.appendChild(title);
      box.appendChild(excerpt);
  
      postContainer.appendChild(box);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
