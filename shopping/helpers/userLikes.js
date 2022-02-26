const models = require('../models');

module.exports = async (req) => {
    const userLikes = [];
    if (req.isAuthenticated()) {
        const user = await models.Users.findOne({
            where: { id: req.user.id },
            include: ['Likes'],
            attributes: ['id']
        });

        for (let key in user.Likes) {
            userLikes.push(user.Likes[key].id);
        }
        
    }
    return userLikes;
}