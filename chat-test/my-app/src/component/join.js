import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Join() {

    useEffect(() => {

        if(cookies.get('name')) {
            window.location.href = "/chat";
        }

    },[])


    const join = (e) => {
        e.preventDefault();
        const { name, room } =e.target
        cookies.set('name', name.value, { path: '/' });
        cookies.set('room', room.value, { path: '/' });

        window.location.href = "/chat"
    }

    return(
        <div>
            <form onSubmit={join}>
                <input type="text" name="name" placeholder="Enter the name" />
                <input type="text" name="room" placeholder="Enter the room" />
                <button type="submit" >join</button>
            </form>
        </div>
    )
}
export default Join