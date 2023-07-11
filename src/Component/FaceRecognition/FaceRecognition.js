import React from 'react';
import './FaceRecognition.css';

export default function FaceRecognition({ imageURL, boxes }) {
    const styles = {
        top: boxes.topRow,
        right: boxes.rightCol,
        bottom: boxes.bottomRow,
        left: boxes.leftCol
    }


    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputimage" alt="" src={imageURL} className="mt3" width="500px" height="auto" />
                {boxeses.map((boxes, i) => {
                    return (
                        <div key={i} className='bounding-boxes' style={styles}></div>
                    )
                })}
            </div>
        </div>
    )
}