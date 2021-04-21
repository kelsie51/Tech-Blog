const router = require('express').Router();
const Blog = require('../../models/Blog');

// route to create/add a blog
router.post('/', async (req, res) => {
  try { 
    const blogData = await Blog.create({
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      user_name: req.body.user_name,
      timestamp: req.body.timestamp,
  });
  //req.session.loggedIn = false;

  res.status(200).json(blogData)
} catch (err) {
  res.status(400).json(err);
}
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one dish can be updated with new data in the database.
  try {
    const blog = await Blog.update(
    {
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      user_name: req.body. user_name,
      timestamp: req.body.timestamp,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (dish) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(blog);
  } catch (err) {
      res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,      
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
