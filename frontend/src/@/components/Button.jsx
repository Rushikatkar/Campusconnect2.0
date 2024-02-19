import React from 'react'

function Button(props) {
    return (
        <div>
            <button type="button" class="btn btn-primary">{props.value}</button>
        </div>
    )
}

export default Button
