import './App.css';
import React, { useEffect, useRef, useState } from 'react';
function App() {
  const [message, setm] = useState("");
  const [datag, set_daat] = useState([]);
  const chat_type = useRef();

  useEffect(() => {

    async function deletel() {
      const set_chat = fetch("https://chat-d7c7c-default-rtdb.firebaseio.com/post.json", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const res = await set_chat;
    }
    deletel()

  }, [])




  async function set() {
    const chat = { chat: message }

    const set_chat = fetch("https://chat-d7c7c-default-rtdb.firebaseio.com/post.json", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chat)
    })

    const res = await set_chat;
  }



  async function getw() {
    const data = await (await fetch("https://chat-d7c7c-default-rtdb.firebaseio.com/post.json")).json()
    const arr = [];
    for (let i in data) {

      arr.push(data[i])
    }

    set_daat([...arr])

  }

  setTimeout(() => {
    getw()
  }, 400)


  return (
    <div className="App">

      <div className='main'>

        <div className='box'>

          <div><h1> Chat Randomly</h1></div>
          <div>
            <nav className='message'>

              {

                datag != [] ? datag.map((e) => { return (<p>{e.chat}</p>) }) : null

              }
              <p>hello</p>

            </nav>
          </div>
          <div>
            <input ref={chat_type} value={message} onChange={(e) => {
              setm(e.target.value);
            }}

              onKeyDown={(e) => {

                if (e.key == "Enter") {

                  if (chat_type.current.value != "") {
                    set()

                    setTimeout(() => {
                      setm("")
                    }, 100)

                    setTimeout(() => {

                      getw()
                    }, 400)
                  }


                }
              }}

              type="text"></input>
            <i onClick={() => {
              
              if (chat_type.current.value != "") {
                set()

                setTimeout(() => {
                  setm("")
                }, 100)

                setTimeout(() => {

                  getw()
                }, 400)
              }

            }} className="fa-solid fa-paper-plane"></i>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
