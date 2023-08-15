const endpoint = 'https://testwp1.braincrop.net/wp-json/wp/v2/posts';

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const postContainer = document.getElementById('post-container'); // Assuming you have a div with this ID

data.forEach(post => {
  const box = document.createElement('div');
  box.classList.add('post-box'); // You can style this class in CSS for formatting

  const title = document.createElement('h2');
  title.innerHTML = post.title.rendered;

  const excerpt = document.createElement('p');
  excerpt.innerHTML = post.excerpt.rendered;

  const image = document.createElement('img');
  if (post.featured_media !== 0) {
    fetch(`https://testwp1.braincrop.net/wp-json/wp/v2/media/${post.featured_media}`)
      .then(response => response.json())
      .then(mediaData => {
        image.src = mediaData.source_url;
      });
  }

  const link = document.createElement('a');
  link.href = post.link;
  link.innerHTML = 'Read More';

  box.appendChild(title);
  box.appendChild(excerpt);
  box.appendChild(image);
  box.appendChild(link);

  postContainer.appendChild(box);
});
  })
  .catch(error => console.error('Error fetching data:', error));