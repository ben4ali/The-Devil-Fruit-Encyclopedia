import React from "react";
import BookDesk from "../assets/image/BookDesk.png";
import "../style/style-book-desk.css";

export const BookDeskComponent = () => {

    return(
        <div className="book-desk">
            <img src={BookDesk} alt="Book Desk" />
        </div>
    )
}