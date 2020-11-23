import React from 'react';

import './inforBar.css';
 
function InfoBar({ room }){
    return(
        <div className="inforBar">
            <div className="leftInnerContainer">
                <h3>{room}</h3>
            </div>
            <div>
                {/* <a></a> */}
            </div>
        </div>
    )  
}
export default InfoBar