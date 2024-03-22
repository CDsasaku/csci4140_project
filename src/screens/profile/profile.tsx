import React from 'react';
import { RootProps } from '../../navigations/screen_navigation_props';

const ProfileScreen: React.FC<RootProps<'Profile'>> = (props) => {
    return (
        <div>
            <h1>Name</h1>
        </div>
    );
};

export default ProfileScreen;