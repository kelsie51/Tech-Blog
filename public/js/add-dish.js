async function newFormHandler(event) {
  event.preventDefault();

  const blog_title = document.querySelector('#blog_title').value;
  const blog_content = document.querySelector('#blog_content').value;
  const user_name = document.querySelector('#user_name').value;
  const timestamp = document.querySelector('#timestamp').value;

  const response = await fetch(`/api/blog`, {
    method: 'POST',
    body: JSON.stringify({
      blog_title,
      blog_content,
      user_name,
      timestamp,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add blog');
  }
}

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
