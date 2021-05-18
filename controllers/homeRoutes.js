const router = require('express').Router();
const { Portfolio, Project } = require('../models');

// GET all portfolio for homepage
router.get('/', async (req, res) => {
  try {
    const dbPortfolioData = await Portfolio.findAll({
      include: [
        {
          model: Project,
          attributes: ['title', 'description'],
        },
      ],
    });

    const portfolios = dbPortfolioData.map((portfolio) =>
      portfolio.get({ plain: true })
    );

    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }

      res.render('homepage', {
        portfolios,
        // We send over the current 'countVisit' session variable to be rendered
        countVisit: req.session.countVisit,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: project,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render('gallery', {
//       gallery,
//       // We are not incrementing the 'countVisit' session variable here
//       // but simply sending over the current 'countVisit' session variable to be rendered
//       countVisit: req.session.countVisit,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET one project
router.get('/project/:id', async (req, res) => {
  try {
    const dbProjectData = await Project.findByPk(req.params.id);

    const project = dbProjectData.get({ plain: true });

    res.render('project', {
      project,
      // We are not incrementing the 'countVisit' session variable here
      // but simply sending over the current 'countVisit' session variable to be rendered
      countVisit: req.session.countVisit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
