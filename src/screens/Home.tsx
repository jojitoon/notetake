import {
  AddIcon,
  Box,
  Button,
  Center,
  Flex,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import * as React from 'react';
import {Alert, Dimensions} from 'react-native';
import {useNotes} from '../context/StorageContext';
import {RichEditor} from '42-react-native-pell-rich-editor';

const HomeScreen = ({navigation}: any) => {
  const {height} = Dimensions.get('screen');
  const {notes} = useNotes();
  return (
    <Box p="2" bg="white" flex="1" safeAreaTop>
      {notes.length === 0 ? (
        <Center flex="1">
          <Text fontSize="xl" fontWeight="bold">
            No notes yet
          </Text>
        </Center>
      ) : (
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingBottom: 100,
          }}>
          <Flex flexDir="row">
            <Box flex="1">
              {notes
                .filter((_, index) => index % 2 === 0)
                .map(item => (
                  <NoteItem item={item} navigation={navigation} key={item.id} />
                ))}
            </Box>
            <Box flex="1">
              {notes
                .filter((_, index) => index % 2 !== 0)
                .map(item => (
                  <NoteItem item={item} navigation={navigation} key={item.id} />
                ))}
            </Box>
          </Flex>
        </ScrollView>
      )}
      <Center
        w="full"
        position="absolute"
        top={height * 0.89}
        bg="white:alpha.40"
        pb="28"
        pt="5">
        <Button
          startIcon={<AddIcon size="sm" color="white" />}
          onPress={() => navigation.navigate('New')}
          bg="black">
          Add New Note
        </Button>
        <Text fontSize="xs" color="red.500:alpha.70">
          Long press note to delete
        </Text>
      </Center>
    </Box>
  );
};

export default HomeScreen;

const NoteItem = ({item, navigation}: {item: any; navigation: any}) => {
  const {deleteNote} = useNotes();
  const editorRef = React.useRef<any>();

  React.useEffect(() => {
    if (item) {
      editorRef.current?.setContentHTML(item.content);
    }
  }, [item]);

  const onDelete = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete note? This action is irreversible.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteNote(id)},
      ],
    );
  };

  return (
    <Pressable
      bg="gray.200:alpha.80"
      py="2"
      m="2"
      borderRadius="md"
      onPress={() => navigation.navigate('Note', {note: item.id})}
      onLongPress={() => onDelete(item.id)}>
      <Box maxHeight="48" overflow="hidden" flex="1">
        <Text mx="2">
          {new Date(item.createdAt).toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <Text textTransform="capitalize" mx="2" fontWeight="semibold">
          {item.title}
        </Text>
        <Box opacity="0.8">
          <RichEditor
            ref={editorRef}
            initialContentHTML={item.content}
            // eslint-disable-next-line react-native/no-inline-styles
            editorStyle={{
              backgroundColor: 'transparent',
            }}
            disabled
          />
        </Box>
      </Box>
    </Pressable>
  );
};
