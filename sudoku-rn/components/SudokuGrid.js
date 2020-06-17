import React from 'react';
import { StyleSheet, ScrollView, TextInput, View } from 'react-native';

function SudokuGrid (props) {
    const { boards } = props;
    const handleChange = (event, item, index) => {
        if(event === '') event = 0;
        item[index] = parseInt(event);
    }
    return (
        <View>
            <ScrollView>
                <View>
                    {
                        boards &&
                        boards.map((item, i) => {
                            return (
                                <View style={styles.grid} key={i.toString()}>
                                    {
                                        item.map((el, index) => {
                                            return (
                                                <TextInput
                                                    style={styles.sudokuColumn}
                                                    editable={el ? false : true}
                                                    key={(index+i).toString()}
                                                    defaultValue={el.toString()}
                                                    maxLength={1}
                                                    keyboardType={'numeric'}
                                                    onChangeText={event => handleChange(event, item, index)}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
    },
    sudokuColumn: {
        backgroundColor: "black",
        padding: 5,
        color: "white",
        justifyContent: "center",
        textAlign: "center",
        height: 50
    }
});

export default SudokuGrid;