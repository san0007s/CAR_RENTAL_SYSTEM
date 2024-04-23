import React from 'react'

function TostMsg({msg}:any) {
    return (
        <div>
            <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Response was Submitted.</span>
                </div>
            </div>
        </div>
    )
}

export default TostMsg