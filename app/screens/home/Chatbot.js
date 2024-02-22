import { View, TouchableOpacity, TextInput, Image, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, images } from '../../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

const Chatbot = ({ navigation }) => {
    const [inputMessage, setInputMessage] = useState('')
    const [outputMessage, setOutputMessage] = useState(
        'Results should be shown here.'
    )
    const [isTyping, setIsTyping] = useState(false)

    const [messages, setMessages] = useState([])
    const renderMessage = (props) => {
        const { currentMessage } = props

        if (currentMessage.user._id === 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: COLORS.primary,
                                marginRight: 12,
                                marginVertical: 12,
                            },
                        }}
                        textStyle={{
                            right: {
                                color: COLORS.white,
                            },
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Image
                        source={images.avatar}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            marginLeft: 8,
                        }}
                    />
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: COLORS.secondaryWhite,
                                marginLeft: 12,
                            },
                        }}
                        textStyle={{
                            left: {
                                color: COLORS.black,
                            },
                        }}
                    />
                </View>
            )
        }

        return <Bubble {...props} />
    }

    const generateText = () => {
        setIsTyping(true)
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createAt: new Date(),
            user: { _id: 1 },
        }

        setMessages((previousMessage) =>
            GiftedChat.append(previousMessage, [message])
        )

        fetch('https://us-central1-diseasedet.cloudfunctions.net/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "query": inputMessage,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setInputMessage('')
                setOutputMessage(data.details)

                const message = {
                    _id: Math.random().toString(36).substring(7),
                    text: data.details,
                    createAt: new Date(),
                    user: { _id: 2, name: 'ChatGPT' },
                }

                setIsTyping(false)
                setMessages((previousMessage) =>
                    GiftedChat.append(previousMessage, [message])
                )
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const submitHandler = () => {
        if (inputMessage.toLowerCase().startsWith('generate image')) {
            generateImages()
        } else {
            generateText()
        }
    }

    const handleInputText = (text) => {
        setInputMessage(text)
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
        >
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.title}>AgroBot</Text>

                {/* <Text style={styles.subtitle}>Talk with the bot and find your answers</Text> */}
            </View>
            {/* <View
                style={{
                    height: 60,
                    backgroundColor: COLORS.background,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 22,
                    width: SIZES.width,
                    zIndex: 9999,
                }}
            >
                {/* <TouchableOpacity
                    onPress={() => navigation.goBack('Home ')}
                    style={{
                        height: 40,
                        width: 40,
                        marginLeft: 5,
                        paddingRight: 20,
                        marginTop: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.text}
                    />
                </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => console.log('Save chat')}>
                    <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color={COLORS.text}
                    />
                </TouchableOpacity> */}
            {/* </View> */}

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCFFB7' }}>
                <GiftedChat
                    messages={messages}
                    renderInputToolbar={() => { }}
                    user={{ _id: 1 }}
                    minInputToolbarHeight={0}
                    renderMessage={renderMessage}
                    isTyping={isTyping}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    paddingVertical: 8,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginLeft: 10,
                        backgroundColor: '#DCFFB7',
                        paddingVertical: 8,
                        marginHorizontal: 12,
                        borderRadius: 12,
                        borderColor: COLORS.text,
                        borderWidth: .2
                    }}
                >
                    <TextInput
                        value={inputMessage}
                        onChangeText={handleInputText}
                        placeholder="Enter your question"
                        placeholderTextColor={COLORS.text}
                        style={{
                            color: COLORS.text,
                            flex: 1,
                            paddingHorizontal: 10,
                        }}
                    />

                    <TouchableOpacity
                        onPress={submitHandler}
                        style={{
                            padding: 10,
                            borderRadius: 8,
                            marginHorizontal: 12,
                        }}
                    >
                        <FontAwesome
                            name="send-o"
                            color={COLORS.primary}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Chatbot;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingBottom: 10,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        paddingTop: 10,
        marginTop: 3,
        paddingBottom: 5,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#1d1d1d',
        marginBottom: 6,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center'
    },
    /** Form */
    form: {
        paddingHorizontal: 24,
        flexDirection: 'column',
        flex: 4
    },
    formAction: {
        marginVertical: 24,
    },
    formFooter: {
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        textAlign: 'center',
    },
    /** Input */
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        backgroundColor: '#007aff',
        borderColor: '#007aff',
    },
    btnText: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: '600',
        color: '#fff',
    },
    mcontainer: {
        flex: 1,
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
    },
    mcontentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,
    },
    mrow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    mtitle: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
    },
    msubtitle: {
        color: "#101318",
        fontSize: 14,
        fontWeight: "bold",
    },
    mdescription: {
        color: "#56636F",
        fontSize: 13,
        fontWeight: "normal",
        width: "100%",
    },
});