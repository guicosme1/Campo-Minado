import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {
    const { mined, opened, nearMines, exploded, flagged } = props
    const stylefield = [styles.field]

    if (opened) stylefield.push(styles.opened)
    if (exploded) stylefield.push(styles.exploded)
    if (flagged) stylefield.push(styles.flagged)
    if (!opened && !exploded) stylefield.push(styles.regular)

    let color = null
    if (nearMines > 0) {
        if (nearMines == 1) color = '#424242'
        if (nearMines == 2) color = '#853939'
        if (nearMines > 2 && nearMines < 6) color = '#a82c2c'
        if (nearMines > 6) color = '#d11f1f'
    }

    return (
        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>
            <View style={stylefield}>
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, {color: color}]}>
                        {nearMines}</Text> : false}
                {mined && opened ? <Mine /> : false}
                {flagged && !opened ? <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular: {
        backgroundColor: '#a1ff5e',
        borderColor: '#619c38',
    },
    opened: {
        backgroundColor: '#E3C29F',
        borderColor: '#E3C29F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    }
})