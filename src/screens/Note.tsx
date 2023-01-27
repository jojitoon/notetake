import {Box, Fab, Heading, ScrollView, Text} from 'native-base';
import * as React from 'react';
import {Header} from '../components/Header';
import {RichEditor} from '42-react-native-pell-rich-editor';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNote} from '../context/StorageContext';

type Props = NativeStackScreenProps<any, string>;

const NoteScreen: React.FC<Props> = ({navigation, route}) => {
  const noteId = route.params?.note;
  const editorRef = React.useRef<any>();

  const note = useNote(noteId);
  React.useEffect(() => {
    if (note) {
      editorRef.current?.setContentHTML(note.content);
    }
  }, [note]);

  return (
    <Box bg="white" flex="1">
      <Header />
      <Box p="3">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Heading textTransform="capitalize">{note?.title}</Heading>
          <Text>
            Last updated:{' '}
            {new Date(note?.updatedAt).toLocaleString('en-GB', {
              hour12: true,
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
          <RichEditor
            ref={editorRef}
            disabled
            initialContentHTML={note?.content}
            useContainer
          />
        </ScrollView>
      </Box>
      <Fab
        bg="black"
        label="Edit Note"
        onPress={() => navigation.navigate('New', {note})}
        borderRadius="md"
        py="2"
        renderInPortal={false}
      />
    </Box>
  );
};

export default NoteScreen;
