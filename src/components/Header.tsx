import * as React from 'react';
import {Box, ChevronLeftIcon, Flex, Pressable} from 'native-base';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Header = ({showMenu}: {showMenu?: boolean}) => {
  const navigation = useNavigation();
  return (
    <Flex
      safeAreaTop
      w="full"
      p="4"
      flexDir="row"
      alignItems="center"
      borderBottomColor="gray.400"
      borderBottomWidth={StyleSheet.hairlineWidth}>
      <Pressable onPress={() => navigation.goBack()}>
        <Flex flexDir="row" alignItems="center">
          <ChevronLeftIcon size="md" color="black" />
          <Box ml="2">All Notes</Box>
        </Flex>
        {showMenu && <Flex flexDir="row" alignItems="center"></Flex>}
      </Pressable>
    </Flex>
  );
};
