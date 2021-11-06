import React from 'react'

export default function NutView(props) {
    const { essayNut, communityChallengeNut, communityEssayNut } = props;
    
    return (
        <div>
            <h1>Total Nuts earned</h1>
            <div className="d-flex align-content-center justify-content-center">
                <h1>{essayNut + communityChallengeNut + communityEssayNut}</h1>
            </div>

            <h3>Nuts earned from essays</h3>
            <div className="d-flex align-content-center justify-content-center">
                <h3>{essayNut}</h3>
            </div>

            <h3>Nuts earned from challenges</h3>
            <div className="d-flex align-content-center justify-content-center">
                <h3>{communityChallengeNut}</h3>
            </div>

            <h3>Nuts earned from upvotes</h3>
            <div className="d-flex align-content-center justify-content-center">
                <h3>{communityEssayNut}</h3>
            </div>

        </div>
    )
}
