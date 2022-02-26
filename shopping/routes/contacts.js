// 환경세팅
const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/lists', ( _ , res) => {
    models.Contacts.findAll({

    }).then((contacts) => {
        res.render ('contacts/lists.html', {
            // SEO 변수
            title: "연락처 리스트 페이지",
            contacts: contacts
        });
    });
    
});

router.get('/lists/detail/:id', async ( req , res ) => {
    const contact = await models.Contacts.findOne({
        where: {
            id: req.params.id
        },
        include: ['comments']
    });
    res.render('contacts/detail.html', {contact});
});

// 연락처 코멘트 달기
router.post('/lists/detail/:id', async (req, res) => {
    try {
        const contact = await models.Contacts.findByPk(req.params.id);
        await contact.createComment(req.body)
        res.redirect('/contacts/lists/detail/' + contact.id)
    } catch(e) {
        console.log(e);
    }
    

});

router.get('/write', (_, res) => {
    res.render ('contacts/write.html', {
        // SEO 변수
        title: "연락처 생성",
    });
})

router.post('/write', (req, res) => {
    models.Contacts.create(
        req.body
    ).then( () => {
        res.redirect('/contacts/lists')
    });
});

router.get('/edit/:id', ( req, res ) => {
    models.Contacts.findByPk(req.params.id).then( (contact) => {
        res.render ('contacts/edit.html', {
            //SEO 변수
            title: "연락처 수정 페이지",

            //데이터 변수
            contact: contact
        });
    });
})

router.post('/edit/:id', ( req, res ) => {
    models.Contacts.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then( () => {
        res.redirect("/contacts/lists/detail/" + req.params.id);
    });
});

// 연락처 삭제
router.get('/lists/delete/:id', async(req,res) => {
    await models.Contacts.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect("/contacts/lists");
});

// 코멘트 삭제
router.get('/lists/delete/:contact_id/:comment_id', async (req, res) => {
    await models.ContactsComments.destroy({
        where: {
            id: req.params.comment_id
        }
    })
    res.redirect("/contacts/lists/detail/" + req.params.contact_id);
});



module.exports = router;