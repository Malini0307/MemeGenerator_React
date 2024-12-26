import {useState,useEffect} from 'react'

const Main = () => {

    const [meme,setMeme] = useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imageUrl:"https://i.imgflip.com/1bij.jpg"
    })

    const [allMemes,setAllMemes] = useState([])

    useEffect(() => {
        async function fetchMemes() {
            try {
                const res = await fetch("https://api.imgflip.com/get_memes");
                const data = await res.json();
                setAllMemes(data.data.memes);
            } catch (error) { 
                console.error("Failed to fetch memes", error);
            }
        }
        fetchMemes();
    
        return () => {}; // No cleanup needed, but avoids accidental issues
    }, []);
    


    /**Get a random number from 0 to array.length use that random
     * number to get a random meme obj from the array.
     */
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
        console.log(newMemeUrl)
    }

    function handleChange(event){
        const {value,name} = event.currentTarget
        console.log(value)
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value,
            [name]:value
        }))
    }
    

  return (
    <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}

                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
  )
}

export default Main