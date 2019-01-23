import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image } from 'react-native';

import { images } from '../constants/images';

const OnboardingLogo = () => (
    <Box center>
        <Image source={images.logo} />
    </Box>
);

export default OnboardingLogo;