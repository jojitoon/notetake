import * as React from 'react';
import {getData, storeData} from '../utils/storage';

interface IStorageContext {
  notes: any[];
  addNote: (note: any) => void;
  updateNote: (note: any) => void;
  deleteNote: (id: string) => void;
}
export const storageContext = React.createContext<IStorageContext>({
  notes: [],
  addNote: (note: any) => {
    console.log('addNote', note);
  },
  updateNote: (note: any) => {
    console.log('addNote', note);
  },
  deleteNote: (id: string) => {
    console.log('deleteNote', id);
  },
});

export const StorageContextProvider = ({children}: any) => {
  const [notes, setNotes] = React.useState<any[]>([]);

  const addNote = (note: any) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    storeData(newNotes);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note: any) => note.id !== id);
    setNotes(newNotes);
    storeData(newNotes);
  };

  const updateNote = (note: any) => {
    const newNotes = notes.map((item: any) => {
      if (item.id === note.id) {
        return note;
      }
      return item;
    });

    setNotes(newNotes);
    storeData(newNotes);
  };

  React.useEffect(() => {
    const getNotes = async () => {
      const notesData = await getData();
      setNotes(notesData);
    };
    getNotes();
  }, []);

  return (
    <storageContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
      {children}
    </storageContext.Provider>
  );
};

export const useNotes = () => React.useContext(storageContext);

export const useNote = (id: string) => {
  const {notes} = useNotes();
  return notes.find((note: any) => note.id === id);
};
