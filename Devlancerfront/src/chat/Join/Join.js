import React, { useState } from 'react';
import { Link,  BrowserHistory} from "react-router-dom";


import './Join.css';

export default function SignIn(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState('Chat');
   

  return (
    <>
  {/* {setName(props.name)} */}
        {/* // <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} */}
        {/* <Link onClick={() => setName(props.name)} > to = {`/chat?name=${name}&room=${room}`}</Link>  */}

      >
      </>
    
  );
}
