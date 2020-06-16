import React from 'react';
import { StyleSheet, FlatList, TextInput, View } from 'react-native';

function SudokuGrid (props) {
    const { boards } = props;
    const handleChange = (event, item, index) => {
        if(event === '') event = 0;
        item[index] = parseInt(event);
    }
    return (
        <View>
            <FlatList data={boards}
            renderItem={({ item }) => 
                <View style={styles.grid}>
                    {
                        item.map((el, index) => {
                            return (
                                <TextInput
                                    style={styles.sudokuColumn}
                                    editable={el ? false : true}
                                    key={index.toString()}
                                    defaultValue={el.toString()}
                                    maxLength={1}
                                    keyboardType={'numeric'}
                                    onChangeText={event => handleChange(event, item, index)}
                                />
                            )
                        })
                    }
                </View>
                }
                keyExtractor={(item, index) => index.toString()}
            />
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