import React from 'react'

// redux
import { connect } from 'react-redux'
import { submitForm } from '../actions/fieldsActions'
import PropTypes from 'prop-types'

class Output extends React.Component {
    render() {
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
                        this.props.result.map((item, idx) => {
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
}

// redux
const mapStateToProps = state => ({
    result: state.fields.result
})

Output.propTypes = {
    result: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { submitForm })(Output);