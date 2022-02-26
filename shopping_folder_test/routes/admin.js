// 환경세팅
const express = require('express');
const router = express.Router();
const models = require('../models');
const loginRequired = require('../helpers/loginRequired');

//csrf setup
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

// image url setup
const path = require('path');
const uploadDir = path.join( __dirname, '../uploads');
const fs = require('fs');

// multer setup
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, 'products-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage: storage });

// image resizer
const sharp = require("sharp");

// paginate
const paginate = require("express-paginate");

// Main admin page
router.get('/', ( _ , res) => {
    res.send('관리자페이지 메인');
});

router.get('/products', paginate.middleware(5, 50), async (req, res) => {
    // paginate.middleware(3, 50) 
    // 50은 최댓값, 유저의 어뷰징 방지 - 50000 이럴경우 DB과부하
    try {

        const [products, totalCount] = await Promise.all([

            models.Products.findAll({
                include: [
                    {
                        model: models.Users,
                        as: 'Owner',
                        attributes: ['username', 'displayname']
                    },
                ],
                offset: req.offset,
                limit: req.query.limit,
                order: [
                    ['createdAt','desc']
                ]
            }),

            models.Products.count()
        ]);

        const pageCount = Math.ceil(totalCount / req.query.limit);

        const pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);

        res.render('admin/products.html', { products, pages, pageCount });

    } catch (e) {

    }

});

router.get('/products/write', loginRequired, csrfProtection, ( req , res) => {
    // res.send('관리자페이지의 제품관리 페이지'); 
    res.render('admin/write.html', { csrfToken : req.csrfToken() });
});

// function문과 =>는 같은 내용

router.post('/products/write', loginRequired, upload.single('thumbnail'), csrfProtection, async(req, res) => {
    // 이미지 파일이 여러개일 경우
    // upload.array('thumbnail');
    // req.files[n];
    try {
    
        if (req.file) {
            await sharp(req.file.path)
            .resize(150,150)
            .jpeg({quality: 90})
            .toFile(
                path.resolve(req.file.destination, "resized", req.file.filename)
            );
            fs.unlinkSync(req.file.path);
        }

        req.body.thumbnail = (req.file) ? req.file.filename : "";

        // 유저를 가져온다음에 저장
        const user = await models.Users.findByPk(req.user.id);
        await user.createProduct(req.body)

        // await models.Products.create(req.body);
        res.redirect('/admin/products');

    } catch(e) {
        console.log(e);
    }
    
});

//제품상세페이지

router.get('/products/detail/:id', async(req, res) => {
    const product = await models.Products.findOne({
        where : { 
            id : req.params.id 
        },
        include : ['memos']
    });
    res.render('admin/detail.html', { product });
});
// router.get('/products/detail/:id', ( req, res ) => {
//     models.Products.findByPk(req.params.id).then((product) => {
//         res.render('admin/detail.html', {
//             title: "제품 {{ product.id }}번 상세페이지",
//         });
//     });
// });

//제품 수정페이지

router.get('/products/edit/:id', loginRequired, csrfProtection, async(req, res) => {
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    const product = await models.Products.findByPk(req.params.id);
    res.render('admin/edit.html', { product, csrfToken: req.csrfToken() });
    
});

router.post('/products/ajax_summernote', loginRequired, upload.single('thumbnail'), (req, res) => {
    res.send( '/' + req.file.filename);
});

// 제품 업데이트 페이지
router.post('/products/edit/:id', loginRequired, upload.single('thumbnail'), csrfProtection, async(req, res) => {

    const product = await models.Products.findByPk(req.params.id);

    console.log(req.file)

    if (req.file && product.thumbnail) {  //요청중에 파일이 존재 할시 이전이미지 지운다.
        fs.unlinkSync(uploadDir + '/resized/' + product.thumbnail);
    }

    if (req.file) {
        await sharp(req.file.path)
        .resize(150,150)
        .jpeg({quality: 90})
        .toFile(
            path.resolve(req.file.destination, "resized", req.file.filename)
        );
        fs.unlinkSync(req.file.path);
    }

    req.body.thumbnail = (req.file) ? req.file.filename : product.thumbnail;
    
    await models.Products.update(
        req.body,{
            where: { id: req.params.id }
        })
    res.redirect('/admin/products/detail/' + req.params.id);
});

// 제품 업데이트 페이지
router.get('/products/delete/:id', async(req, res) => {
    await models.Products.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/admin/products');
});

// 메모 생성
router.post('/products/detail/:id', async (req, res) => {

    try {

        const product = await models.Products.findByPk(req.params.id);
        // create + as에 적은 내용 ( Products.js association 에서 적은 내용 )
        await product.createMemo(req.body)
        res.redirect('/admin/products/detail/' + req.params.id);

    } catch (e) {
        console.log(e)
    }


});

// 메모삭제 
router.get('/products/delete/:product_id/:memo_id', async (req, res) => {
    
    await models.ProductsMemo.destroy({
        where: {
            id: req.params.memo_id
        }
    });

    res.redirect('/admin/products/detail/' + req.params.product_id );
});



// admin route 모듈 export
module.exports = router;