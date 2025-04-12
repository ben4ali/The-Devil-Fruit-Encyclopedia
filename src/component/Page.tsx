import { FC } from "react";
import { DevilFruit } from "../types/DevilFruit";

import border from "../assets/image/border.png";
import "../style/style-page.css";

import logia from "../assets/image/logia.png";
import paramecia from "../assets/image/paramecia.png";
import zoan from "../assets/image/zoan.png";
import { DevilFruitType } from "../types/DevilFruitType";

interface PageProps {
    side: string;
    devilFruit : DevilFruit;
    pageIndex: number;    
}

export const Page: FC<PageProps> = ({ side, devilFruit, pageIndex }) => {
    return(
        <div className={side === "left" ? "left-page" : "right-page"}>
            <div className="header-info">
                <div className="image-holder">
                    <img className="border" src={border} alt="border" />
                    <img className="devil-fruit-image" src={devilFruit.imageUrl} alt="Devil Fruit" />
                </div>
                <div className="devil-fruit-info">
                    <h3 className="devil-fruit-name">{devilFruit.originalName}</h3>
                    <div className="name-holder">
                        <h3 className="devil-fruit-name">{devilFruit.romanizedName}</h3>
                        <h3 className="devil-fruit-name">{devilFruit.englishName}</h3>
                    </div>
                    
                    <div className="type-holder">
                        <img 
                            className="type-image" 
                            src={
                                devilFruit.type === DevilFruitType.LOGIA ? logia : 
                                devilFruit.type === DevilFruitType.PARAMECIA ? paramecia : 
                                devilFruit.type ===  DevilFruitType.ZOAN ? zoan : 
                                devilFruit.type ===  DevilFruitType.ANCIENT_ZOAN ? zoan :
                                devilFruit.type ===  DevilFruitType.MYTHICAL_ZOAN ? zoan :
                                undefined
                            } 
                            alt={devilFruit.type} 
                        />
                        <h4 className="devil-fruit-type">{devilFruit.type}</h4>
                    </div>
                    <div className="holder-container">
                        {(devilFruit.pastHolders || []).map((holder, index) => (
                            <div key={index} className="holder-info">
                                <h4 className={`holder-name ${holder !== devilFruit.currentHolder ? "past-holder" : ""}`}>
                                    {holder}
                                </h4>
                            </div>
                        ))}
                    </div>
                    <div className="debut-info">
                        <h5 className="debut-chapter">{devilFruit.debutChapter}</h5>
                        <h5 className="debut-episode">{devilFruit.debutEpisode}</h5>
                        <h5 className="debut-arc">{devilFruit.debutArc}</h5>
                    </div>
                </div>
            </div>
            <div className="description-info">
                <div className="desc-group">
                    <h5 className="description-title">Meaning</h5>
                    <p className="description-text">{devilFruit.meaning}</p>
                </div>

                <div className="desc-group">
                    <h5 className="description-title">Description</h5>
                    <p className="description-text">{devilFruit.description}</p>
                </div>

                {devilFruit.awakeningStatus && (
                    <div className="desc-group awakening">
                        <h5 className="description-title">Awakening</h5>
                        <p className="description-text">{devilFruit.awakeningDescription}</p>
                    </div>
                )}

            </div>
        </div>
    )
}