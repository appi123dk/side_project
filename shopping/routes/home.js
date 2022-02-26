const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET home page. */
router.get('/', async (req, res) => {
    const products = await models.Products.findAll({
        include: [
            {
                model: models.Users,
                as: 'Owner',
                attributes: ['username', 'displayname']
            },
            {
                model: models.Tag,
                as: 'Tag'
            }
        ],
        order: [
            ['Tag', 'createdAt', 'desc']
        ],
        where: {
            // 객체 내에서 조건문을 작성하는 함수
            // ...( 조건 ? true : false)
            ...(
                // 검색어가 있는 경우
                ('name' in req.query && req.query.name) ? 
                {
                    [models.Sequelize.Op.or] : [
                        models.Sequelize.where( models.Sequelize.col('Tag.name'), {
                            [models.Sequelize.Op.like] : `%${req.query.name}%` 
                        }),
                        {
                            'name' : {
                                [models.Sequelize.Op.like]: `%${req.query.name}%` 
                            }
                        }
                    ]
                }
                :
                '' ),
        }
    });

    const userLikes = await require('../helpers/userLikes')(req);
    // console.log(models.Products.findAll())
    // res.render('home.html', { products, userLikes });
    res.render('home.html', { products, userLikes });
});


// 상품상세화면 구현
router.get('/products/:id', async (req, res) => {

    try {

        // const product = await models.Products.findByPk(req.params.id);
        const product = await models.Products.findOne({
            where: {
                id: req.params.id,
            },
            include: ['Tag'],
            order: [
                ['Tag', 'createdAt','desc']
            ]
        })

        const userLikes = await require('../helpers/userLikes')(req);

        if (!product) {
            return require('../helpers/show404template')(res);
        }
        res.render('products/detail.html', { product, userLikes });

        

    } catch (e) {

    }

});

module.exports = router;