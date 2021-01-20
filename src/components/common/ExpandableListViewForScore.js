
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import colors from '../../utility/Colors';
import { IconX, ICON_TYPE } from '../../icons';

import { TableView } from '../../components/common/PointTableViewForScore'
import { FONT_FAMILY_HEEBO_REGULAR, FONT_FAMILY_HEEBO_MEDIUM } from '../../utility/Typography';
import { BOTH_TEAM_RADIUS } from '../../utility/constants';

function ExpandableListViewForScore({ data }) {



    const [toggleView, setToggleView] = useState(false);

    console.warn(JSON.stringify(data));

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => setToggleView(!toggleView)} activeOpacity={1} style={{
                display: 'flex',
                alignItems: 'center', flexDirection: 'row', backgroundColor: colors.STATUS_BAR_COLOR_TRANS_more, padding: 10
            }}>

                <View style={{ flex: 6, flexDirection: 'row', left: 0 }}>
                    <Text style={{ color: colors.white, fontFamily: FONT_FAMILY_HEEBO_REGULAR, fontSize: 15 }}>{(data.team_name).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: colors.white, fontFamily: FONT_FAMILY_HEEBO_REGULAR, fontSize: 15 }}>{data.score + "-" + data.wickets + " " + "(" + data.overs + ")"}</Text>
                    <IconX origin={ICON_TYPE.EVIL_ICONS} name={'chevron-right'} size={35} color={colors.white} style={{ transform: [{ rotate: toggleView ? '270deg' : '90deg' }] }} />
                </View>

            </TouchableOpacity>
            {
                toggleView ?
                    <View style={{ display: 'flex' }}>


                        <TableView
                            borderRadius={BOTH_TEAM_RADIUS}
                            showScoreTable={true}
                            color={colors.RED_DARK}
                            name={'BATSMAN: '}
                            p='R'
                            w='B'
                            l='4s'
                            t='6s'
                            pts='SR' />

                        <View style={{ marginVertical: 5 }}>
                            {
                                data.batting != undefined &&
                                data.batting.map((item, index) => {

                                    return <TableView
                                        borderRadius={BOTH_TEAM_RADIUS}
                                        key={index}
                                        index={index}
                                        length={data.batting.length}
                                        showRadius={true}
                                        showBorder={true}
                                        color={colors.white}
                                        name={item.player_name}
                                        p={item.runs + ""}
                                        w={item.balls + ""}
                                        l={item.fours + ""}
                                        t={item.sixes + ""}
                                        pts={item.strike_rate + ""}
                                        title2={item.is_out === "0" ? "not out" : item.out_text}

                                    />
                                })
                            }
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <TableView
                                borderRadius={BOTH_TEAM_RADIUS}
                                borderRadius={BOTH_TEAM_RADIUS}
                                key={0}
                                index={0}
                                length={1}
                                showRadius={true}
                                showScoreTable={true}
                                color={colors.RED_DARK}
                                name={'EXTRAS'}
                            />
                        </View>
                        {/* <Text style={{ paddingVertical: 10, paddingHorizontal: 7 }}>
                            ({
                                data.extras != undefined &&
                                data.extras.map((item, index) => {

                                    return <Text style={{ fontFamily: FONT_FAMILY_HEEBO_MEDIUM, color: colors.BLUE_TXT, backgroundColor: colors.RED_DARK }}>
                                        {Object.keys(item)}: {Object.values(item)},</Text>

                                })
                            })
                        </Text> */}


                        <TableView
                            borderRadius={BOTH_TEAM_RADIUS}
                            showScoreTable={true}
                            color={colors.RED_DARK}
                            showRadius={true}
                            key={0}
                            index={0}
                            length={2}
                            name={'BOWLER'}
                            p='O'
                            w='M'
                            l='R'
                            t='W'
                            pts='ER' />

                        {
                            data.bowling != undefined &&

                            data.bowling.map((item, index) => {
                                return <TableView
                                    key={index}
                                    color={colors.white}
                                    name={item.player_name}
                                    p={item.overs + ""}
                                    w={item.maidens + ""}
                                    l={item.runs + ""}
                                    t={item.wickets + ""}
                                    pts={item.economy + ""} />
                            })
                        }

                        <TableView
                            borderRadius={BOTH_TEAM_RADIUS}
                            showScoreTable={true}
                            color={colors.RED_DARK}

                            showScoreTable={true}
                            name={'FALL OF WICKETS'}
                            w='Score'
                            t='Over' />

                        {


                            data.fall_of_wickets != undefined &&
                            data.fall_of_wickets.map((item, index) => {
                                return <TableView
                                    key={index}
                                    color={colors.white}
                                    name={item.player_name}
                                    w={item.score + ""}
                                    t={item.over + ""} />
                            })
                        }


                    </View> : null
            }

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 0,
        borderColor: 'white'

    },

})

export default ExpandableListViewForScore;

