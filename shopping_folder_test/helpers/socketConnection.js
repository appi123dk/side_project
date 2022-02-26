// remove by value helper 소환
require('./removeByValue')();

module.exports = (io) => {
    io.on('connection', (socket) => {

        let userList = [];

        // socket.request.session 은 app.js에서 연결
        const session = socket.request.session.passport;
        const user = (typeof session !== 'undefined') ? (session.user) : "";

        // userList 필드에 사용자 명이 존재하지 않으면 삽입 => 신규유저 확인
        if(!userList.includes(user.displayname)){
            userList.push(user.displayname);
        }
        io.emit('join', userList);

        // console.log("소켓 접속 완료");
        socket.on('client message', (data) => {
            // console.log(data);
            io.emit('server message', 
                { 
                    message: data.message,
                    displayname: user.displayname
                }
            );
        });
        // disconnect는 socket.io의 예약어. 누가 나갔을때 할 작동을 써야함
        socket.on('disconnect', () => {
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        })
    });
}
