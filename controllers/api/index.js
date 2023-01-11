const router = require('express').Router();
const userRoutes = require('./user-routes');
const clientRoutes = require('./client-routes');
const commentRoutes = require('./comment-routes');

// api endpoints | /api/<route name>
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/comments', commentRoutes);

module.exports = router;