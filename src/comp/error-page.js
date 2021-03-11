import React from "react";
import {Link} from "react-router-dom";
import "../styles/error-page.scss";

function Error() {
    
    return (
        <>
        <section className="error-page">
            <h3>page not found :(</h3>
            <Link to="/">back to homepage</Link>
        </section>
        </>
    )

}

export default Error;