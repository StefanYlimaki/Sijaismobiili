import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import substitutions from '../assets/data/substitutionsData_new.json'
import Slider from '@react-native-community/slider';

const SavedStack = createNativeStackNavigator()

function UserInfoScreen()  {
    return(
        <View>
            <Text>Moi NIMINEN</Text>
        </View>
    )
}

export default UserInfoScreen