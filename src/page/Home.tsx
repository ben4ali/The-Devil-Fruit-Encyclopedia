import React from "react";
import "../style/style-home.css";
import { BookDeskComponent } from "../component/BookDesk";

export default function Home() {
    return(
        <main className="home">
            <BookDeskComponent />
        </main>
    )
}