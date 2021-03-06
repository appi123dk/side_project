const models = require('../models');

module.exports = async () => {
    try {
        //사용자 정보 삽입
        await models.Users.create({
            username: 'admin',
            password: '1234',
            status: '이메일인증완료',
            displayname: '관리자',
        });

        await models.Users.create({
            username: 'test@naver.com',
            password: '1234',
            status: '이메일인증완료',
            displayname: '노드강사',
        });

        // 임시 제품
        await models.Products.bulkCreate([
            {
                name: "제품1",
                thumbnail: "https://nodeshop.s3.ap-northeast-2.amazonaws.com/products/1/9c48a660-9e2b-11e9-815e-cf2c1474d8dd.jpeg",
                price: 2000,
                description: "데모제품입니다.",
                user_id: 1
            },
            {
                name: "제품2",
                thumbnail: "https://nodeshop.s3.ap-northeast-2.amazonaws.com/products/2/0b117b10-9e2e-11e9-bc52-6bfe1a9c7540.jpeg",
                price: 1000,
                description: "데모제품입니다.",
                user_id: 1
            }
        ])

        // 교회 섬네일 추가
        await models.ProductsMemo.bulkCreate([
            {
                content: "첫번째 메모1",
                product_id: 1
            }, {
                content: "첫번째 메모2",
                product_id: 1
            }
        ]);


    } catch (err) {
        // throw(err);
    }
}