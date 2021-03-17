import React, {useRef, useState, useContext} from "react";
import "../styles/drag-and-drop-box.scss";
import {Context} from "../comp/context";
import PopUp from "./popup-message";
import { PDFDocument} from 'pdf-lib'
import LoadingIcon from "../icons/loading_gif.gif";

function DragAndDrop({setName, setBtnVisibility}) {
    
    const {setFiles} = useContext(Context);
    
    const fileRef = useRef(null);

    const inputFile = useRef(null);

    const [state, setState] = useState(true);

    const [style, setStyle] = useState(false);

    const [visible, setVisible] = useState(false);
    
    const [processing, setProcessing] = useState(false);

    function drop(e) {
        e.preventDefault();
        var files = [...e.dataTransfer.files];
        handleFile(files);
    }

    function dragOver(e) {
        e.preventDefault();
        setStyle(true);
    }

    function dragLeave(e) {
        e.preventDefault();
        setStyle(false);
    }

    const message = "file not supported, upload a PDF file";

    function detectDevice() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        return toMatch.some(item =>{
            return navigator.userAgent.match(item);
        });
    }

    function sendPDF(files) {
        setState(false);
        setProcessing(true);
        mergePDF(files).then(f => {
            setName(files[0].name);
            setBtnVisibility(true);
            setFiles(f);
            setProcessing(false);
        });
    }

    function handleFile(pdfDoc) {
        let countValidPDF = 0;

        if (pdfDoc.length === 1) {
            if (pdfDoc[0].type !== "application/pdf") {
                setVisible(true);
                setStyle(false);
            }
            else{
                sendPDF(pdfDoc);
                setVisible(false);
            }
        }
        else{
            pdfDoc.forEach(file => {
                if (file.type !== "application/pdf") {
                    setVisible(true);
                }
                else{
                    countValidPDF++;
                    if (countValidPDF === pdfDoc.length) {
                        sendPDF(pdfDoc);
                        setVisible(false);
                    }
                }
            });
        }
    }

    async function mergePDF(files) {
        const mergedPdf = await PDFDocument.create(); 

        for (let i = 0; i < files.length; i++) {
            
            let bytes = await readFile(files[i]);

            const pdf = await PDFDocument.load(bytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            }); 
            
        }
        const mergedPdfFile = await mergedPdf.saveAsBase64({ dataUri: true });
        return mergedPdfFile;
    }
    
    function readFile(file) {
        return new Promise((resolve,reject) =>{
            let reader = new FileReader();

            reader.onload = () =>{
                resolve(reader.result);
            }
            reader.onerror = reject; 
            reader.readAsArrayBuffer(file);
        })
    }

    function inputFiles(e) {
        inputFile.current.click();
    }

    function handleChange(e) {
        let pdfList = [];
        var file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            pdfList.push(file[i]);
        }
        handleFile(pdfList);
    }

    if (processing) {
        return (
        <>
            <section className="canvas-main-container">
                <section className="canvas-container">
                    <h4>loading file...</h4>
                    <img src={LoadingIcon} alt="loading icon"></img>
                </section>
            </section>
        </>
        )
    }

    return (
        <>
        {state && 
            <section className="main-container-drop-area">

                <section className="drop-area" id="drop-area" onDrop={e => drop(e)} onDragOver={e => dragOver(e)} onDragLeave={e => dragLeave(e)} ref={fileRef} border-theme={style.toString()}>

                    <div className="choose-files-container">
                        <input type="file" style={{display:'none'}} ref={inputFile} multiple accept="application/pdf" onChange={e => handleChange(e)}/>
                        <button className="choose-files-btn" onClick={() => inputFiles()}>
                            choose your PDF files
                        </button>
                    </div>

                    {!detectDevice() && <div className="dnd-content">
                        <p>or drag and drop</p>
                    </div>
                    }
                </section>

            </section>
        }
        <PopUp message={message} visible={visible} setVisible={setVisible}/>
        </>
    );
}

export default DragAndDrop;