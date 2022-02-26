// 환경세팅
const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', (req, res) => {

    let totalAmount = 0; //총결제금액
    let cartList = {}; //장바구니 리스트
    //쿠키가 있는지 확인해서 뷰로 넘겨준다
    if (typeof (req.cookies.cartList) !== 'undefined') {
        //장바구니데이터
        cartList = JSON.parse(unescape(req.cookies.cartList));

        //총가격을 더해서 전달해준다.
        for (const key in cartList) {
            totalAmount += parseInt(cartList[key].amount);
        }
    }
    res.render('checkout/index.html', { cartList, totalAmount });
});


router.post('/complete', async (req, res) => {

    await models.Checkout.create(req.body);
    res.json({ message: "success" });

});

router.get('/success', (req, res) => {
    res.render('checkout/success.html');
});

router.get('/complete', async(req, res) => {

    // 모듈 선언
    const { Iamporter } = require('iamporter');
    const iamporter = new Iamporter({
        apiKey: '7160851464022914',
        secret: 'CcWVlpk7xX8lviKbHQpWLxn0xgUETpCwCysXXM4uKdQgwBrdrQadoxdVO8zHxbd9KF7Hsbcdp3tVEU96'
    });

    try {

        const iamportData = await iamporter.findByImpUid(req.query.imp_uid);
        await models.Checkout.create({
            imp_uid: iamportData.data.imp_uid,
            merchant_uid: iamportData.data.merchant_uid,
            paid_amount: iamportData.data.amount,
            apply_num: iamportData.data.apply_num,

            buyer_email: iamportData.data.buyer_email,
            buyer_name: iamportData.data.buyer_name,
            buyer_tel: iamportData.data.buyer_tel,
            buyer_addr: iamportData.data.buyer_addr,
            buyer_postcode: iamportData.data.buyer_postcode,

            status: iamportData.data.status,
        });

        res.redirect('/checkout/success');


    } catch (e) {
        console.log(e);
    }
});

router.get('/nomember', (req, res) => {
    res.render('checkout/nomember.html');
});

router.get('/nomember/search', async (req, res) => {
    try {
        const checkouts = await models.Checkout.findAll({
            where: {
                buyer_email: req.query.buyer_email
            }
        })
        res.render('checkout/search.html', { checkouts });
    } catch (e) {
        console.log(e)
    }    
});

router.get('/shipping/:invc_no', async(req, res) => {
    // 모듈선언
    const request = require('request-promise');
    const cheerio = require('cheerio');

    try {

        //대한통운의 현재 배송위치 크롤링 주소
        const url = "https://www.doortodoor.co.kr/parcel/ \
    doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=" + req.params.invc_no;
        let result = []; //최종 보내는 데이터

        const html = await request(url);
        const $ = cheerio.load(html,
            { decodeEntities: false } //한글 변환
        );

        const tdElements = $(".board_area").find("table.mb15 tbody tr td"); //td의 데이터를 전부 긁어온다
        // 아래 주석을 해제하고 콘솔에 찍어보세요.
        // console.log(tdElements[3].children[1].children[0].data);

        var temp = {};
        for ( let i = 0; i < tdElements.length; i++) {
            if(i % 4 === 0){
                temp = {};
                temp["step"] = tdElements[i].children[0].data.trim();
            } else if ( i % 4 === 1) {
                temp["date"] = tdElements[i].children[0].data;
            } else if ( i % 4 === 2) {
                temp["status"] = tdElements[i].children[0].data;
                if(tdElements[i].children.length > 1) {
                    temp["status"] += tdElements[i].children[2].data;
                }
            } else if ( i % 4 === 3) {
                temp["location"] = tdElements[i].children[1].children[0].data;
                result.push(temp);
            }
        }

        res.render('checkout/shipping.html', {result});


    } catch (e) {
        console.log(e)
    }
});

module.exports = router;