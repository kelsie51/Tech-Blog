async function deleteFormHandler(event) {
  event.preventDefault();
  const blog_title = document.querySelector('#blog_title').value;
  const blog_content = document.querySelector('#blog_content').value;
  const user_name = document.querySelector('#user_name').value;
  
  // What will the value of has_nuts be if the box in the form is checked? 
  // The value of has_nuts will be true if the box is checked. 
  // What do we call this kind of operator?
  // We call this a ternary operator. It begins with a condition followed by a question mark and two code blocks separated by a :.
  const timestamp = document.querySelector('#timestamp').value;

// window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
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

  // What happens if the response is ok?
  // If the response is ok, that means that the dish was updated successfully. 
  if (response.ok) {
    document.location.replace(`/blog/${id}`);
   
  } else {
    alert('Failed to edit blog');
  }
}

document.querySelector('.delete-blog-form').addEventListener('submit', deleteFormHandler);
