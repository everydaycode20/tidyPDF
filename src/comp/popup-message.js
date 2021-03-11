import React from "react";
import CloseIcon from "../icons/close_icon.svg";

function PopUp({message, visible, setVisible}) {

    const style = {
        position: "absolute",
        zIndex: "20",
        backgroundColor: "#f4c983",
        padding: "16px",
        borderRadius: "5px",
        top: "14%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }

    const imgStyle = {
        width: "24px",
        position: "absolute",
        left: "92%",
        top: "2%",
        cursor: "pointer",
    }

    function close() {
        setVisible(false);
    }
    
    return (
        <>
        {visible &&
            <div className="popup-container" style={style}>
                <img src={CloseIcon} alt="close icon" style={imgStyle} onClick={() => close()}/>
                <p>{message}</p>
            </div>
        }
        </>
    )

}

export default PopUp;