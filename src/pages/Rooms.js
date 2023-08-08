import { useEffect, useState } from "react";

import axios from 'axios';

import { Link } from "react-router-dom";

const Rooms = (props) => {
    const [rooms, setRooms] = useState([]);

    const [title, setTitle] = useState('');

    useEffect(() => {
        getRooms();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/rooms/', { 'title': title })
            .then(data => {
                console.log('SUCCESS', data);

                axios.get('http://localhost:8000/api/rooms/').then(data => {
                    setRooms(data.data);
                });
            }).catch(e => {
                console.log('error', e);
            });
        
        setTitle('');
    }
    const onDelete = (roomCode) => {
        console.log(roomCode);

        axios.delete(`http://localhost:8000/api/rooms/${ roomCode }`)
            .then(data => {
                console.log('SUCCESS', data);

                getRooms();
            }).catch(e => {
                console.log('error', e);
            });
    }
    
    const getRooms = () => {
        axios.get('http://localhost:8000/api/rooms/').then(newData => {
            setRooms(newData.data);
        });
    }

    return (
        <div id = "rooms" className = { cssContentContainer["content-container"] }>
            <form onSubmit = { onSubmit }>
                <input type = "text" placeholder = "Title" value = { title } onChange = { e => setTitle(e.target.value) } />
                <input type = "submit" value = "Create" />
            </form>
            <div>
                { rooms.map(room => (
                    <div key = { room.code }>
                        <Link to = { `/r/${ room.code }` }>
                            <p>{ room.title }</p>
                        </Link>
                        <button onClick = { () => onDelete(room.code) }>Delete</button>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Rooms;