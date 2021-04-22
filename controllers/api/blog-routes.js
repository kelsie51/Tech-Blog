const router = require('express').Router();
const Blog = require('../../models/Blog');
const User = require('../../models/User');

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

router.put('/:id', async (req, res) => {

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


// CREATE new user
router.post('/new', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
     // req.session.username = username;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
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
      req.session.username = req.body.email;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
