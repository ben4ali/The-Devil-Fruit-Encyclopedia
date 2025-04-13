import React from "react";
import "../style/style-home.css";
import { BookDeskComponent } from "../component/BookDesk";

export default function Home() {
    return(
        <main className="home">
            <h1>THE DEVIL FRUIT ENCYCLOPEDIA</h1>
            <BookDeskComponent />
        </main>
    )
}