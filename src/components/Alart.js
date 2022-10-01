import React from 'react'

function Alart(props) {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alart