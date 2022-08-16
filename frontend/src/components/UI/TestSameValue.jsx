import React from 'react'
import { useState } from 'react';

function TestSameValue() {
    console.log('render!!!');
    const [render, setRender] = useState(false)
    console.log('render:',render);


    const rerenderHandler = () => {
        console.log('rerenderHandler pressed!!!');
        setRender("changed at least once")
    }
  return (
    <div><button onClick={rerenderHandler}>HELLO</button></div>
  )
}

export default TestSameValue