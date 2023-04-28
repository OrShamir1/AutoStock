import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const [text, setText] = useState("")

    const updateText = event => {
        setText(event.target.value)
    }

    const navigate = useNavigate();
    const HandleClick = function () {

        navigate(`/Stock/${text}`);
    } 

    return (
        <div id="catalog" style={{textAlign: "center"}}>
            <h2 style={{display: "inline"}}>Stock Symbol: </h2>
            <div id="input" style={{display: "inline"}} >
                <input type="text" value={text} onChange={updateText} />
                <button onClick={HandleClick}>Submit</button>
            </div>
        </div>
    )
}
export default LandingPage;