import React from 'react'

class ContentContainer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="contentContainer">
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default ContentContainer;