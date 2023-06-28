const router = require("express").Router();
const partyController = require("../controllers/partyController");
const { param, body, validationResult } = require("express-validator");
let cache = require("express-redis-cache");

cache = cache({
    prefix: "redis-test",
    host: "redis",
    port: 6379,
});

cache.invalidate = (name) => {
    return (req, res, next) => {
        const routeName = name ? name : req.url;
        console.log(routeName);

        if (!cache.connected) {
            next();
            return;
        }

        cache.del("/api/parties", (error) => {
            console.log(error);
        });

        cache.del("/api/parties/*", (error) => {
            console.log(error);
        });

        console.log("Invalidate Cache!");
        next();
    };
};

// Post
router
    .route("/parties")
    .post(
        [
            body("title")
                .isAlphanumeric()
                .withMessage("Insira um título válido!"),
            body("author")
                .isAlphanumeric()
                .withMessage("Insira um nome de autor válido!"),
            body("description")
                .isAlphanumeric()
                .withMessage("Insira uma descrição válida!"),
            body("budget")
                .isNumeric()
                .withMessage("Insira um valor para orçamento válido!"),
        ],
        cache.invalidate(),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: errors.array() });
            }
            partyController.create(req, res);
        }
    );

// GetAll
router.route("/parties").get(cache.route(), (req, res) => {
    partyController.getAll(req, res);
});

// GetById
router
    .route("/parties/:title")
    .get(
        [
            param("title")
                .isAlphanumeric()
                .withMessage("O título deve ser alfanumérico!"),
        ],
        cache.route(),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: errors.array() });
            }
            partyController.get(req, res);
        }
    );

// Delete
router
    .route("/parties/:id")
    .delete(
        [
            param("id")
                .isAlphanumeric()
                .withMessage("O ID deve ser alfanumérico!"),
        ],
        cache.invalidate(),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: errors.array() });
            }
            partyController.delete(req, res);
        }
    );

// Update
router
    .route("/parties/:id")
    .put(
        [
            param("id")
                .isAlphanumeric()
                .withMessage("O ID deve ser alfanumérico!"),
        ],
        cache.invalidate(),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: errors.array() });
            }
            partyController.update(req, res);
        }
    );

// ------------------------------- //

// // Post
// router
//     .route("/parties")
//     .post(
//         [
//             body("title")
//                 .isAlphanumeric()
//                 .withMessage("Insira um título válido!"),
//             body("author")
//                 .isAlphanumeric()
//                 .withMessage("Insira um nome de autor válido!"),
//             body("description")
//                 .isAlphanumeric()
//                 .withMessage("Insira uma descrição válida!"),
//             body("budget")
//                 .isNumeric()
//                 .withMessage("Insira um valor para orçamento válido!"),
//         ],
//         (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ msg: errors.array() });
//             }
//             partyController.create(req, res);
//         }
//     );

// // // GetAll
// router.route("/parties").get((req, res) => partyController.getAll(req, res));

// // GetById
// router
//     .route("/parties/:title")
//     .get(
//         [
//             param("title")
//                 .isAlphanumeric()
//                 .withMessage("O título deve ser alfanumérico!"),
//         ],
//         (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ msg: errors.array() });
//             }
//             partyController.get(req, res);
//         }
//     );
// // Delete
// router
//     .route("/parties/:id")
//     .delete(
//         [
//             param("id")
//                 .isAlphanumeric()
//                 .withMessage("O ID deve ser alfanumérico!"),
//         ],
//         (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ msg: errors.array() });
//             }
//             partyController.delete(req, res);
//         }
//     );

// // Update
// router
//     .route("/parties/:id")
//     .put(
//         [
//             param("id")
//                 .isAlphanumeric()
//                 .withMessage("O ID deve ser alfanumérico!"),
//         ],
//         (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ msg: errors.array() });
//             }
//             partyController.update(req, res);
//         }
//     );

module.exports = router;
