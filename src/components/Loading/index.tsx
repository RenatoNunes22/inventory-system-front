import LogoSingle from '../../assets/the_brothers.png'

import './style.css'

export default function Loading() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 999,
                }}
            >
                <img src={LogoSingle} height="40" width="40" alt="" />
            </div>
            <div className="container-loader">
                <span className="loader"></span>
            </div>
        </>
    )
}
