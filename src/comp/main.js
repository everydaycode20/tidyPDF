// import React, {useState, useEffect} from "react";
// // import {Link} from "react-router-dom";
// import "../styles/main_page.scss";
// import GifDnD from "../icons/main_page_gifs/drag_and_drop_animation.gif";
// import GifDeleteMove from "../icons/main_page_gifs/delete_move.gif";
// import ArrowForward from "../icons/arrow-forward_icon.png"
// import GifDownloadPDF from "../icons/main_page_gifs/download_pdf.gif";
// import ImageDeleteMove from "../icons/main_page_gifs/delete_move_image.jpg";
// import ImageDownloadPDF from "../icons/main_page_gifs/download_pdf_image.jpg";
// import ImageDnD from "../icons/main_page_gifs/drag_and_drop_image.jpg";

// function Main() {
    
//     const [imageChangeDND, setImageChangeDND] = useState(ImageDnD);

//     const [imageChangeDownload, setImageChangeDownload] = useState(ImageDownloadPDF);

//     const [imageChangeDeleteMove, setImageChangeDeleteMove] = useState(ImageDeleteMove);

//     const [status, setStatus] = useState();

//     useEffect(() => {
//         if (!status) {
//             setTimeout(() => {
//                 setImageChangeDND(GifDnD);
//                 setTimeout(() => {
//                     setImageChangeDeleteMove(GifDeleteMove);
//                     setTimeout(() => {
//                         setImageChangeDownload(GifDownloadPDF);
//                     }, 800);
//                 }, 800);
//             }, 1500);
//         }
//     }, [])

//     function changeImageDND() {
//         setImageChangeDND(GifDnD);
//         setStatus(true);
//     }

//     function changeImageDeleteMove() {
//         setImageChangeDeleteMove(GifDeleteMove);
//         setStatus(true);
//     }

//     function changeImageDownload() {
//         setImageChangeDownload(GifDownloadPDF);
//         setStatus(true);
//     }

//     return (
//         <>
//             <main className="main">
//                 <header className="container-link">
//                     <Link to="/" className="logo-container">
//                         <div className="logo">
//                             <h3><span>tidy</span>PDF</h3>
//                         </div>
//                     </Link>
//                 </header>
//                 <section className="main-features">
//                     <h1>Handle your PDF files in just one website</h1>
//                     <section className="steps-container">
//                         <div className="step 1" >
//                             <h2>drag and drop your PDF files</h2>
//                             <div className="gif-container 1">
//                                 <img src={imageChangeDND} alt="drag and drop your PDF files gif"/>
//                             </div>
//                         </div>
//                         <div className="step 2" >
//                             <h2>delete or move around the pages</h2>
//                             <div className="gif-container 2">
//                                 <img src={imageChangeDeleteMove} alt="delete or move around the PDF pages gif"/>
//                             </div>
//                         </div>
//                         <div className="step 3">
//                         <h2>download your new PDF file, that's it</h2>
//                             <div className="gif-container 3">
//                                 <img src={imageChangeDownload} alt="download the new PDF file gif"/>
//                             </div>
//                         </div>
//                     </section>
//                     <Link to="/tool" className="link-tool">
//                         <div className="tool">
//                             <h3>start using <span>tidy</span>PDf</h3>
//                         </div>
//                         <img src={ArrowForward} alt="arrow forward icon"/>
//                     </Link>
//                 </section>
//             </main>
//         </>
//     )
// }

// export default Main;