import React, {useContext, useEffect, useState, useRef} from "react";
import "../styles/canvas.scss";
import "../styles/progress-bar.scss";
import {Context} from "../comp/context";
import DeleteIcon from "../icons/delete_icon.svg";
import LoadingIcon from "../icons/loading_gif.gif";

const pdfjsLib = require("pdfjs-dist/webpack");
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

function Canvas() {
    
    const {files} = useContext(Context);

    const [status, setStatus] = useState(false);

    const [pdfFile, setPdfFile] = useState([]);
    
    // const [pages, setPages] = useState([]);

    const [pages, setPages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(0);

    const [displayProgressBar, setDisplayProgressBar] = useState(false);

    const itemsRef = useRef([]);

    const elmRef = useRef([]);

    const refLoad = useRef();

    const [image, setImage] = useState();

    useEffect(() => {
        
        showCanvas(pages);

    }, [pages]);

    const showCanvas = pages =>{
        
        let progressBarCalc = 0;
        let c = 0;
        console.log(itemsRef);
        setDisplayProgressBar(true);
        console.log(elmRef);
        for (let i = 1; i <= pages.numPages; i++) {
            
            console.log("canvas begins");
            pages.getPage(i).then(page => {
                console.log(page);
                var scale = 0.2;
                var viewport = page.getViewport({scale: scale});
                let canvas = itemsRef.current;
                var context = canvas[i-1].getContext('2d');
                console.log(viewport.height, viewport.width);
                canvas[i-1].height = Math.round(viewport.height);
                canvas[i-1].width = Math.round(viewport.width);
            
                var renderContext = {canvasContext: context, viewport: viewport};
                
                
                var renderTask = page.render(renderContext);
                console.log(renderTask);
                renderTask.promise.then(() =>{
                    c++;
                    progressBarCalc = Math.round((c / pages.numPages) * 100);
                    setProgress(progressBarCalc);
                    if (c === pages.numPages) {
                        return true;
                    }
                    console.log("page loaded");
                }).then(e =>{
                    if (e) {
                        if (progressBarCalc === 100) {
                            setTimeout(() => {
                                setDisplayProgressBar(false);
                            }, 800);
                        }
                        events();
                    }
                }).catch(error => console.log(error));
            });
        }
    };

    console.log("render again");
    useEffect(() => {  

        files && getPages();

    }, [files]);

    const getPages = () =>{
        if (files.length) {
            
            setLoading(true);
            const loadingPdf = pdfjsLib.getDocument(files);
            
            loadingPdf && loadingPdf.promise.then(pdf => {
                
                for (let i = 1; i <= pdf.numPages; i++) {
                    pdf.getPage(i).then(page => {
                        setPdfFile(old => [...old, page]);
                        setImage(DeleteIcon);
                        console.log(page, "139");
                        
                    });
                }
                setPages(pdf);
                setStatus(true);
                setLoading(false);
            });
        }
    }

    function events() {

        var dragSrcEl = null;

        function handleDragStart(e) {
            dragSrcEl = e.target.parentElement;
            e.dataTransfer.setData("text/plain", e.target.id);
            e.dataTransfer.effectAllowed = 'move';
            this.style.opacity = "1";
        }
    
        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    
        function dragLeave(e) {
            
        }

        function handleDrop(e) {
            e.preventDefault();
            if (e.target.parentElement.parentElement.parentElement.className === "canvas-container-main") {
                var id = e.dataTransfer.getData('text/plain');
                e.target.parentElement.parentElement.parentElement.appendChild(document.getElementById(id));
                dragSrcEl.appendChild(e.target.parentElement.parentElement);
            }
        }
        
        elmRef.current.forEach(item => {
            item.addEventListener('dragstart', handleDragStart, false);
            item.addEventListener('dragover', handleDragOver, false);
            item.addEventListener('drop', handleDrop, false);
            item.addEventListener('dragleave', dragLeave, false);
        });

    }

    function deletePage(e) {
        if (e.target.parentElement.parentElement.parentElement.className === "canvas-container-main") {
            e.target.parentElement.parentElement.parentElement.remove();
        } 
    }

    if (loading) {
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
    
    if (status) {
        return <>
            {displayProgressBar && <div className="progress-bar">
                <div className="content" style={{width: progress+"%"}}></div>
            </div> }
            <section className="canvas-main-container">
                
                <section className="canvas-container">
                    {pdfFile.map((file, i) => {
                        const {_pageIndex} = file;
                        console.log(i, "216");
                        
                        return (
                            <div className="canvas-container-main" key={_pageIndex} ref={refLoad}>
                                <div className={`main-container-canvas ${i+1}`} id={`main-container-canvas ${i+1}`} draggable={true} ref={el => elmRef.current[i] = el}>
                                    <div className={`canvas ${i}`} id={`canvas ${i}`} >
                                        <canvas  ref={el => itemsRef.current[i] = el} id={`canvas-item ${i}`} ></canvas>
                                        <span>{i+1}</span>
                                    </div>
                                    <div className="delete-icon" onClick={e => deletePage(e)}>
                                        <img src={image} alt="delete icon"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </section>
            </section>
            
        </>
    }
    
    return null;

}

export default Canvas;