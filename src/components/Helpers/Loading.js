import React from 'react'

const Loading = () => {
    return (
        <div id="loading">
            <div className="section-header"> 
            <h2> Loading </h2>
            <div className="lds-ellipsis">    
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>      
            </div>
        </div>
    )
}

export default Loading
