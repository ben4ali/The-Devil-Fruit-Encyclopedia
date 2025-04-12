import BookDesk from "../assets/image/BookDesk.png";
import "../style/style-book-desk.css";
import { BookComponent } from "./Book";

export const BookDeskComponent = () => {

    return(
        <div className="book-desk">
            <BookComponent />
            <img src={BookDesk} alt="Book Desk" />
        </div>
    )
}