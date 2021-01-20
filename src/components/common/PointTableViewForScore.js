
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import colors from '../../utility/Colors';
import BaseFlatlist from './BaseFlatlist'

import { FONT_HEEBO_THIN, FONT_FAMILY_HEEBO_BOLD, FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_MEDIUM } from '../../utility/Typography';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';

function PointsTableView({ onPress, showScoreTable }) {

    const FlatListItemSeparator = () => {
        return (
            <View style={{
                height: 1,
                backgroundColor: colors.grey300
            }} />
        )
    }

    return (
        <View style={styles.container}>
            <BaseFlatlist
                data={['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ index }) =>
                    <TableView
                        key={index}
                        color={showScoreTable ? colors.white : index % 2 == 0 ? colors.white : colors.grey100}
                        name={'Brisbane Heat '}
                        p='8'
                        w='5'
                        l='3'
                        t='0'
                        pts='10'
                        title2={showScoreTable ? 'c Fran Wilson b Belinda Vakarewa' : null}
                        showScoreTable={showScoreTable}
                        nrr={showScoreTable ? null : '0.73'}
                        onPress={onPress}
                    />
                }
            />

        </View>


    );
}

export const TableView = ({ color, name, p, w, l, t, pts, nrr, customFontFamily, title2, showScoreTable, onPress, showBorder, borderRadius,
    showRadius, index, length }) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{
                display: 'flex',
                backgroundColor: color || colors.white,
                flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 7, paddingVertical: 12,
                borderWidth: showBorder ? 0.2 : 0,
                borderColor: colors.grey100,
                borderTopLeftRadius: showRadius && borderRadius != undefined && index == 0 ? borderRadius : 0,
                borderTopRightRadius: showRadius && borderRadius != undefined && index == 0 ? borderRadius : 0,
                borderBottomRightRadius: showRadius && borderRadius != undefined && (index === length - 1) ? borderRadius : 0,
                borderBottomLeftRadius: showRadius && borderRadius != undefined && (index === length - 1) ? borderRadius : 0,

                // borderColor: colors.grey200
            }}>

            <View style={{ flex: 4, }}>
                <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_MEDIUM : customFontFamily || FONT_FAMILY_HEEBO_MEDIUM, color: showScoreTable ? colors.white : colors.BLUE_TXT, }}>{name || null}</Text>
                {title2 != undefined && <Text numberOfLines={2} style={{ fontSize: 10, fontFamily: customFontFamily || FONT_FAMILY_HEEBO_MEDIUM, color: showScoreTable ? colors.white : colors.BLUE_TXT, }}>{title2 || null}</Text>}
            </View>

            <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', left: 10 }}>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{p || null}</Text>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{w || null}</Text>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{l || null}</Text>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{t || null}</Text>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{pts || null}</Text>
                {nrr ? <Text style={{ flex: 1, fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_REGULAR, color: showScoreTable ? colors.white : colors.BLUE_TXT, textAlign: 'center' }}>{nrr || null}</Text> : null}
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        backgroundColor: colors.white
    },
    mainView: {
        flex: 1,
        backgroundColor: colors.white,
        // maxHeight: 300,
        borderRadius: 5,
        flexDirection: 'row'
    }

})

export default PointsTableView;


