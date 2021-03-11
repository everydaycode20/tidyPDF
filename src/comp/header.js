import React, {useState, useContext} from "react";
import LoadFilesIcon from  "../icons/load_file_icon.svg";
import DownloadIcon from "../icons/download_icon.png";
import DownloadIconGif from "../icons/download_gif.gif";
import "../styles/header.scss";
import { PDFDocument} from 'pdf-lib'
import {Context} from "../comp/context";
import download from 'downloadjs';
import {Link} from "react-router-dom";

function Header({name, btnVisibility}) {

    const {files} = useContext(Context);

    const [downloadGif, setDownloadGif] = useState(DownloadIcon);
    
    function downloadPDF() {

        setDownloadGif(DownloadIconGif);
        let numPagesList = [];
        let span = document.querySelectorAll(".canvas span");

        span.forEach(element => {
            numPagesList.push(parseInt(element.textContent)-1);

        });

        getPages(files, numPagesList);
        setTimeout(() => {
            setDownloadGif(DownloadIcon);
        }, 3800);
    }
    
    async function getPages(data, docPages) {
        
        const existingPdfBytes = await fetch(data).then(res => res.arrayBuffer());
        
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        
        const newPDF = await PDFDocument.create();

        const indices = docPages;
        
        const pages = await newPDF.copyPages(pdfDoc, indices);
        
        for (let i = 0; i < indices.length; i++) {
            newPDF.addPage(pages[i]);
        }

        const pdfBytes = await newPDF.save();
        
        download(pdfBytes, `${name}-tidyPDF.pdf`, 'application/pdf');
    }
    
    return <>
        <div className="top-container">
            <Link to="/" className="link-container">
                <div className="logo">
                    <h3><span>tidy</span>PDF</h3>
                </div>
            </Link>
            {/* <button className="load-btn">
                start over
                <img src={LoadFilesIcon} alt="load pdf icon"/>
            </button> */}

            {btnVisibility && <div className="download-btn-container">
                <button className="download-btn" onClick={() => downloadPDF()}>
                    download pdf
                    <img src={downloadGif} alt="load pdf icon"/>
                </button>
            </div>}
        </div>
        <div className="download-message"></div>
    </>
    
}



export default Header;