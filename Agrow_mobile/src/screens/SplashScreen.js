import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { inject } from 'mobx-react/native';

import OnboardingLogo from '../commons/OnboardingLogo';
import { NavigationService } from '../api/NavigationService';

@inject('currentUser')
class SplashScreen extends Component {
    state = {};

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = async () => {
        //  setTimeout(() => {
        //     this.props.navigation.navigate('Auth');
        //  }, 2000);
        await this.props.currentUser.setupAuth();
    };
    
    render () {
        return (
            <Box f={1} center>
                <OnboardingLogo />
            </Box>

        );
    }
}

export default SplashScreen;