const router = require('express').Router();
const userRoutes = require('./user-routes');
// const userRoutes = require('./user-routes');
// const clientRoutes = require('./client-routes');
// const postRoutes = require('./post-routes');
// const commentRoutes = require('./comment-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes);
// router.use('/clients aka posts', clientRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;