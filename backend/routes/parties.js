const router = require("express").Router();
const partyController = require("../controllers/partyController");
// let cache = require('express-redis-cache');

// cache = cache({
//     prefix: 'redis-test',
//     host: 'redis',
//     port: 6379
// });

// cache.invalidate = (name) => {

//     return (req, res, next) => {

//         const routeName = name ? name : req.url;
//         console.log(routeName);

//         if (!cache.connected) {
//             next();
//             return;
//         }

//         cache.del('/api/parties', (error) => {
//             console.log(error);
//         });

//         cache.del('/api/parties/*', (error) => {
//             console.log(error);
//         });
        
//         console.log('Invalidate Cache!');
//         next();
//     };
// };

// Post
// router.route("/parties").post(cache.invalidate(), (req, res) => partyController.create(req, res));

// // GetAll
// router.route("/parties").get(cache.route(), (req, res) => partyController.getAll(req, res));

// // GetById
// router.route("/parties/:title").get(cache.route(), (req, res) => partyController.get(req, res));

// // Delete
// router.route("/parties/:id").delete(cache.invalidate(), (req, res) => partyController.delete(req, res));

// // Update
// router.route("/parties/:id").put(cache.invalidate(), (req, res) => partyController.update(req, res));

// Post
router.route("/parties").post((req, res) => partyController.create(req, res));

// GetAll
router.route("/parties").get((req, res) => partyController.getAll(req, res));

// GetById
router.route("/parties/:title").get((req, res) => partyController.get(req, res));

// Delete
router.route("/parties/:id").delete((req, res) => partyController.delete(req, res));

// Update
router.route("/parties/:id").put((req, res) => partyController.update(req, res));

module.exports = router;