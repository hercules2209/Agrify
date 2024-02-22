import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text, View, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';

import { getAuth } from "firebase/auth";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot, doc, getDoc
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { firestoreDB, auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../colors';
import { StatusBar } from 'expo-status-bar';


export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState('');
    const navigation = useNavigation();
    // const user = auth.currentUser;
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const uid = user.uid;
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    const getUser = async () => {
        const docRef = doc(firestoreDB, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setUserInfo(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            console.log()
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(firestoreDB, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(firestoreDB, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        type="font-awesome"
                        name="paperclip"
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                            marginBottom: 10,
                            marginRight: 10,
                            transform: [{ rotateY: '180deg' }],
                        }}
                        size={25}
                        color='blue'
                        tvParallaxProperties={undefined}
                    />
                    <Icon
                        type="font-awesome"
                        name="send"
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{ marginBottom: 10, marginRight: 10 }}
                        size={25}
                        color='blue'
                        tvParallaxProperties={undefined}
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                    left: {
                        backgroundColor: '#fff',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };

    return (
        // <>
        //   {messages.map(message => (
        //     <Text key={message._id}>{message.text}</Text>
        //   ))}
        // </>
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <Text style={styles.title}>Global Chat</Text>

                {/* <Text style={styles.subtitle}>Enter the details below to find the best crop recommendations</Text> */}
            </View>

            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                messagesContainerStyle={{
                    backgroundColor: '#DCFFB7'
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                // textInputStyle={{
                //     backgroundColor: '#DCFFB7'
                //     ,
                // }}

                user={{
                    _id: auth?.currentUser?.uid,
                    avatar: userInfo.photoURL
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingBottom: 10,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flex: 1,
        backgroundColor: '#DCFFB7'
    },
    header: {
        paddingTop: 55,
        marginTop: 6,
        paddingBottom: 6,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#1d1d1d',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#929292',
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