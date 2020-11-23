import React ,{useState, useEffect} from 'react';
import io from 'socket.io-client';
import './chat.css'
import InfoBar from './infoBar';
import Messages from './messages';
import Input from './input';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let socket;

export default function Chat(){
  
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    // console.log(name, room);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:7000';

    useEffect(() => {
        const name = cookies.get('name').toString();
        const room = cookies.get('room').toString()
        socket = io(ENDPOINT)
        socket.emit('join', { name, room}, () => {
            console.log(name,room);
        });

        setName(name)
        setRoom(room)

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    },[ENDPOINT])



    useEffect(() => {
        
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

    },[messages])



    const sendMessage = (event) => {
        event.preventDefault();
        
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }


    console.log(message,messages);

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
} 