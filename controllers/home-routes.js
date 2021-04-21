const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// route to get all dishes
router.get('/', async (req, res) => {
    const blogData = await Blog.findAll().catch((err) => { 
        res.json(err);
      });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('all', { 
          blogs,
           loggedIn: req.session.loggedIn, 
        });
      });
  
  // route to get one dish
  router.get('/blog/:id', async (req, res) => {
    try{ 
        const blogData = await Blog.findByPk(req.params.id);
        if(!blogData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }
        const blog = blogData.get({ plain: true });
        res.render('blog', blog);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  

module.exports = router;
