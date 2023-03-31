import {View, FlatList, Image, Text, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';

function App(): JSX.Element {
  const [users, setUsers] = useState([]);
  const [currenPage, setCurrentPage] = useState(1);
  const getUsers = async () => {
    const uri = `https://randomuser.me/api/?page=${currenPage}&results=10&seed=abc1`;
    try {
      const response = await axios.get(uri);
      const results = response?.data?.results;
      setUsers(prevUsers => prevUsers.concat(results));
    } catch (e) {
      return [];
    }
  };

  const onLoadMoreUser = () => {
    setCurrentPage(currenPage + 1);
  };

  useEffect(() => {
    getUsers();
  }, [currenPage]);

  return (
    <FlatList
      data={users}
      renderItem={({item}: {item: any}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'gray',
              marginVertical: 5,
            }}>
            <Image
              style={{width: 60, height: 60}}
              source={{uri: item?.picture?.large}}
            />
            <View>
              <Text>{item?.name?.first}</Text>
              <Text>{item?.email}</Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={() => {
        // if(loading) return null;
        return <ActivityIndicator size={'small'} />;
      }}
      onEndReached={onLoadMoreUser}
    />
  );
}

export default App;
