import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

GoBack = ({navigate, state}) => {
    return state.routeName === 'Home' ? null :
        (
            <TouchableOpacity style={{marginLeft: 25}} onPress={ () => { navigate('DeckList') } } >
                <Entypo name={'home'} size={30} />
            </TouchableOpacity> 
        )
    }

export default GoBack;