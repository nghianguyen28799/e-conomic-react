const express =require('express');
const socketio = require('socket.io');
const http = require('http');

const app = require('express');
const { callbackify } = require('util');
const server = http.createServer(app);
const io = socketio(server);

//User
const users = []; 
//add user
const addUser = ({ id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name)

    if(existingUser) {
        return {error: 'Username is taken'};
    }

    const user = {id, name, room };
    users.push(user);
    // console.log(users);
    return { user }
}

//remove user
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}
//get user
const getUser = (id) => users.find((user) => user.id === id);
//get user in room
const getUserInRoom = (room) => ((user) => user.room === room)



io.on('connection', (socket) => {
    
    socket.on('join', ({name, room}, callback) => {
        // console.log(name, room, socket.id);
        const { error, user } = addUser({ id: socket.id, name: name, room: room });
        if(error) return callback(error)
       
        console.log(user);

        socket.emit('message', { user: 'admin', text : ` Hi ${user.name}, Can I help u?`});
        // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});
        socket.join(user.room);
        // io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)});
        callback();
    })   
    
    

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        // console.log(user);
        io.to(user.room).emit('message', { user: user.name, text: message});
        // io.to(user.room).emit('roomData', { room: user.room,  users: getUserInRoom(user.room)});
        callback();
    })


    socket.on('disconnect', () => {
        // console.log('user had left!!!!');
        const user = removeUser(socket.id);

        // if(user) {
        //     io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        // }
    })
})



server.listen(7000, () => {
    console.log('listening on *:7000');
});