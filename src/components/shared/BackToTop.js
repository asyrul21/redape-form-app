import React from 'react'

const BackToTop = (props) => {
    return (
        <React.Fragment>
            <div onClick={props.onClick} className='backtotopButton'>
                <div className='buttonIcon'></div>
                <div className='buttonText'>Back to Top</div>
            </div>
            <style jsx>{`
                .backtotopButton {
                    // border: blue solid 1px;
                    color: black;
                    text-align: center;
                    line-height: 45px;

                    background-color: #E5E5E5;
                    height: 40px;
                    width: 140px;

                    margin-top: 70px;
                    margin-bottom: -50px;
                    border-radius: 5px;

                    opacity: 0.9;

                    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.42);

                    display:flex;
                    justify-content: center;
                }

                .backtotopButton:hover{
                    opacity: 1;
                    cursor: pointer;
                }

                .buttonIcon {
                    margin:0;
                    // border: white solid 1px;
                    height: 100%;
                    width: 40px;

                    background-image: url('/backtotop.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: fit;
                }

                .buttonText{
                    margin:0;
                    // border: blue solid 1px;
                    height:100%;
                    width: 90px;
                    padding-right:5px;

                    font-size: 14px;
                    font-weight: 500;
                    line-height: 40px;
                }

            `}</style>
        </React.Fragment>
    )
}

export default BackToTop;