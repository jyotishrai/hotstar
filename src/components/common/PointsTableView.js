
import React from 'react';
import { View, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native'
import colors from '../../utility/Colors';
import BaseFlatlist from './BaseFlatlist'

import useTranslation from '../../i18n';
import { FONT_HEEBO_REGULAR, FONT_FAMILY_HEEBO_MEDIUM, FONT_FAMILY_HEEBO_BOLD } from '../../utility/Typography';

function PointsTableView({ onPress, showPointTable, showScoreTable }) {
    const { t } = useTranslation()


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

            {showPointTable ? <TableView
                color={colors.grey200}
                name={t('teams')}
                p='P'
                w='W'
                l='L'
                t='T'
                pts='PTS'
                nrr='NRR'
                customFontFamily={FONT_FAMILY_HEEBO_BOLD}
            /> : null}

            {showScoreTable ? <TableView
                color={colors.grey300}
                name={t('batsman')}
                p='R'
                w='B'
                l='4s'
                t='6s'
                pts='SR'
                //  nrr='NRR'
                customFontFamily={FONT_FAMILY_HEEBO_BOLD}
            /> : null}

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
                        name={'Brisbane Heat Women'}
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

const TableView = ({ color, name, p, w, l, t, pts, nrr, customFontFamily, title2, showScoreTable, onPress }) => {

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
                bottomBorderWidth: showScoreTable ? 1 : 0
            }}>

            <View style={{ flex: 4, }}>
                <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_FAMILY_HEEBO_MEDIUM, color: colors.headerColor1, }}>{name || null}</Text>
                {showScoreTable ? <Text numberOfLines={2} style={{ fontSize: 10, fontFamily: customFontFamily || FONT_FAMILY_HEEBO_MEDIUM, color: colors.red900, }}>{title2 || null}</Text> : null}
            </View>

            <View style={{ flex: 6, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', left: 10 }}>
                <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{p || null}</Text>
                <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{w || null}</Text>
                <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{l || null}</Text>
                <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{t || null}</Text>
                <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{pts || null}</Text>
                {nrr ? <Text style={{ fontSize: 12, fontFamily: showScoreTable ? FONT_FAMILY_HEEBO_BOLD : customFontFamily || FONT_HEEBO_REGULAR, color: showScoreTable ? colors.black : colors.headerColor1, textAlign: 'center' }}>{nrr || null}</Text> : null}
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


