import React from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'


//functional component, instead of class
//because simpler

const BaseLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}

export default BaseLayout;