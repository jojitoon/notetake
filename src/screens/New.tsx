import {
  actions,
  RichEditor,
  RichToolbar,
} from '42-react-native-pell-rich-editor';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Box,
  CheckIcon,
  Fab,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from 'native-base';
import * as React from 'react';
import {Keyboard, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Header} from '../components/Header';
import {useNotes} from '../context/StorageContext';
type Props = NativeStackScreenProps<any, string>;

const NewScreen: React.FC<Props> = ({navigation, route}) => {
  const note = route.params?.note;
  const insets = useSafeAreaInsets();
  const richText = React.useRef<any>();
  const scrollRef = React.useRef<any>();
  const titleRef = React.useRef<any>();
  const [keyboardDidShow, setKeyboardDidShow] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  console.log({actions});

  const {addNote, updateNote} = useNotes();

  const bottomInset = keyboardDidShow ? 0 : insets.bottom;

  const handleSave = () => {
    if (note) {
      updateNote({
        ...note,
        title,
        content,
        updatedAt: new Date().toISOString(),
      });
    } else {
      addNote({
        title,
        content,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    navigation.goBack();
  };

  React.useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const showSave = title.length > 0 && content.length > 0;

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardDidShow(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',

      () => {
        setKeyboardDidShow(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Box flex="1" bg="white">
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}>
        <Box flex="1" px="2" pt="2">
          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            <Input
              ref={titleRef}
              placeholder="Note title"
              fontSize="lg"
              borderWidth="0"
              fontWeight="bold"
              _focus={{
                bg: 'white',
              }}
              onChangeText={setTitle}
              value={title}
            />
            <RichEditor
              ref={richText}
              initialContentHTML={content}
              onChange={setContent}
              onCursorPosition={offsetY => {
                scrollRef.current.scrollTo({
                  y: offsetY - 30,
                  animated: true,
                });
              }}
              placeholder="Note content"
              editorInitializedCallback={() => {
                titleRef.current.focus();
              }}
              useContainer
            />
          </ScrollView>
        </Box>
        <Box mb={bottomInset}>
          <RichToolbar
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.setStrikethrough,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.code,
              actions.table,
              actions.blockquote,
              actions.insertLink,
              actions.checkboxList,
              actions.removeFormat,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
              [actions.heading2]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H2</Text>
              ),
              [actions.heading3]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H3</Text>
              ),
            }}
          />
        </Box>
        {showSave && (
          <Fab
            bg="green.600"
            icon={<CheckIcon size="sm" color="white" />}
            bottom={100}
            onPress={handleSave}
          />
        )}
      </KeyboardAvoidingView>
    </Box>
  );
};

export default NewScreen;
