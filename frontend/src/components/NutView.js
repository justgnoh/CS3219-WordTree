import React from 'react'

export default function NutView(props) {
    const { totalNut, essayNut, communityChallengeNut, communityEssayNut } = props;
    
    return (
        <div>
            <h3 className="d-flex align-content-center justify-content-center">Total Nuts earned</h3>
            <div className="d-flex align-content-center justify-content-center">
                <h3>{totalNut}</h3>
            </div>
        

            <h5 className="d-flex align-content-center justify-content-center">Earned from essays</h5>
            <div className="d-flex align-content-center justify-content-center">
                <h5>{essayNut}</h5>
            </div>

            <h5 className="d-flex align-content-center justify-content-center">Earned from challenges</h5>
            <div className="d-flex align-content-center justify-content-center">
                <h5>{communityChallengeNut}</h5>
            </div>

            <h5 className="d-flex align-content-center justify-content-center">Earned from upvotes</h5>
            <div className="d-flex align-content-center justify-content-center">
                <h5>{communityEssayNut}</h5>
            </div>

        </div>
    )
}
