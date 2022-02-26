const models = require('../../models');
const paginate = require('express-paginate');

exports.get_products = async (req, res) => {

    try {

        const [products, totalCount] = await Promise.all([

            models.Products.findAll({
                include: [
                    {
                        model: models.User,
                        as: 'Owner',
                        attributes: ['username', 'displayname']
                    },
                ],
                limit: req.query.limit,
                offset: req.offset
            }),

            models.Products.count()
        ]);

        const pageCount = Math.ceil(totalCount / req.query.limit);

        const pages = paginate.getArrayPages(req)(4, pageCount, req.query.page);

        res.render('admin/products.html', { products, pages, pageCount });

    } catch (e) {
        console.log(e);
    }

}