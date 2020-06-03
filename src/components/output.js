import React from 'react'

const Output = (props) => {
    let style = {
        marginTop: '50px',
        width: '100%',
        minHeight: '200px',
        border: 'black 2px solid',
        padding: '30px'
    }

    return (
        <React.Fragment>
            <div className="outputContainer" style={style}>
                <h2 style={{ marginBottom: '20px' }}>Fields:</h2>
                {
                    props.data.map((item, idx) => {
                        return (
                            <>
                                <pre>
                                    {JSON.stringify(item, null, 2)}
                                </pre>
                            </>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Output