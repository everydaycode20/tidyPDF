import React, {useContext, useRef, useEffect, useState} from "react";
import {ThemeContext} from "../comp/context";

function CanvasItem({pdfFile}) {
    
    // const {setCanvasItems} = useContext(ThemeContext);
    const itemsRef = useRef([]);
    const [contador, setContador] = useState(0)
    // useEffect(() => {
        
    //     setCanvasItems(itemsRef);

    // }, [itemsRef])

    if ((contador + 1) >= pdfFile.length) {
        return null;
    }

    if (contador < pdfFile.length) {
        
    
    return (
        <>
            {pdfFile.map((file, i) =>{
                const {_pageIndex} = file;
                console.log(_pageIndex);
                setContador(contador + _pageIndex);
                debugger;
                return (
                    <>
                        <div className="canvas" key={new Date()}>
                            <canvas  draggable={true} ref={el => itemsRef.current[i] = el}>{_pageIndex}</canvas>
                        </div>
                    </>
                )

            })}
        </>
    );
        }
}

export default CanvasItem;