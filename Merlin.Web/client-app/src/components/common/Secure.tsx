import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';

type SecureProps = {
    claims: any,
    requireClaim: string,
    requireClaimValue?: string[]
};

class Secure extends React.Component<SecureProps>{

    private isAuthorized(): boolean {
        const { claims, requireClaim, requireClaimValue } = this.props;

        const userClaims = Array.isArray(claims[requireClaim]) ? claims[requireClaim] : Array(claims[requireClaim]);

        //if claim is not in user's claims
        if (userClaims === undefined) {
            return false;
        }

        //if the user must have the claim, but not a specific claim value
        if (requireClaimValue === undefined || requireClaimValue.length === 0) {
            return true;
        }

        //here the user has claims and the item being secured requires a specific claim value so we need to check for it
        if (requireClaimValue.some(requiredClaim => userClaims
                .some((userClaim: string) => userClaim === requiredClaim))) {
            return true;
        }

        return false;
    }

    public render() {

        if (this.isAuthorized()) {
            return this.props.children;
        }

        return null;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            claims: state.session.claims
        }
    },
    undefined
)(Secure);