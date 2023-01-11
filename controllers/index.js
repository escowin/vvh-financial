const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

// endpoints routes | api & views 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// handles requests to non-existent endpoints
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;