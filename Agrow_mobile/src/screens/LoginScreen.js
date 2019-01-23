import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { TouchableOpacity, Alert, Animated } from 'react-native';
import { inject } from 'mobx-react/native';

import OnboardingLogo from '../commons/OnboardingLogo';
import LoginButton from '../commons/LoginButton';
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';

@inject('currentUser')
class LoginScreen extends Component {
    state = {
        opacity: new Animated.Value(0),
        position: new Animated.Value(0)
    };

    componentDidMount() {
        Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();
        
    }

    opacityAnim = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 600,
            delay: 100
        }).start()
    }

    positionAnim = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    onGooglePress = async () => {
        try {
            const token = await GoogleApi.loginAsync();
    
            await this.props.currentUser.login(token, 'GOOGLE');
           } catch (error) {
               console.log('error', error);
           }
    }

    onFacebookPress = async () => {
       try {
        const token = await FacebookApi.loginAsync();

        await this.props.currentUser.login(token, 'FACEBOOK');

        console.log('token', token);
       } catch (error) {
           console.log('error', error);
       }
    }

    render () {

        const { opacity } = this.state;

        const logoTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange:[150, 0]
        })

        return (
            <Box f={1} center bg="white">
                <Animated.View style={{ flex: 1, transform: [{translateY: logoTranslate}]}}>
                    <Box f={1} center >
                        <OnboardingLogo />
                    </Box>
                </Animated.View>
                <Animated.View style={{flex: 0.9, width: '100%', opacity}}> 
                    <LoginButton onPress={this.onGooglePress} type="google">Continue with Google</LoginButton>
                    <LoginButton onPress={this.onFacebookPress} type="facebook">Continue with Facebook</LoginButton>
                </Animated.View>
            </Box>

        );
    }
}

export default LoginScreen;