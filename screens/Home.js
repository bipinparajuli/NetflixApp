import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView} from 'react-native'
import {Fab,Icon} from 'native-base'
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  // Icon,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  // Fab,
  Subtitle,
  Container,
  Spinner
} from 'native-base'
import AsyncStorage from "@react-native-community/async-storage";
import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation,route}) => {
const [listOfaSeasons, setlistOfaSeasons] = useState(["Game of Throne"])
const [loading, setloading] = useState(false)

const isFocused = useIsFocused()

const getList =  async (id) => {
  setloading(true)

  const storedValue = await AsyncStorage.getItem("@season_list")

  if(!storedValue){
    setlistOfaSeasons([])
  }

  const list = JSON.parse(storedValue)
  setlistOfaSeasons(list)

  setloading(false)
}

const deletSeason = async (id) => {
  const newList = await listOfaSeasons.filter(list => list.id != id)
  await AsyncStorage.setItem("@season_list",JSON.stringify(newList))

  setlistOfaSeasons(newList)
}

const markComplete = async () => {
  console.log("pressed")
  const newArr = listOfaSeasons.map (list => {
    if(list.id = id){
      list.isWatched = !list.isWatched
    }
    return list 
  })

  await AsyncStorage.setItem("",JSON.stringify(newArr))
  setlistOfaSeasons(newArr)
}
useEffect(() => {
  getList();
}, [isFocused])

if(loading){
  return (
<Container style={styles.container}>
<Spinner color="#00b7c2" />
</Container>
  )
}

return (
<ScrollView contentContainerStyle={styles.container}>
    {   
    
    listOfaSeasons.length == 0 ? (
      <Container style={styles.container}>
        <H1 style={styles.heading}>
          Watchlist is empty. Please add a season
        </H1>
      </Container>
    ):(
 <>
      <H1 style={styles.heading}>Next series to watch</H1>
      <List style={styles.listItem} noBorder>
      {
        // console.log(listOfaSeasons),
      listOfaSeasons.map(season=> (
        <ListItem key={season.id} style={styles.listItem} noBorder>
        <Left>
          <Button
           style={styles.actionButton}
            danger
            onPress={() => deletSeason(season.id)}
            
            >
            <Icon name="trash" active/>
          </Button>

          <Button
             style={styles.actionButton} 
             primary
          onPress={() => {
            navigation.navigate("Edit",{season})
          }}
          >
            <Icon name="edit" type="Feather" active/>
          </Button>
        </Left>
      <Body>
        <Title>{season.name}</Title>
        <Text  note>{season.totalNoSeason}</Text>
      </Body>
      <Right>
        <CheckBox 
        checked={season.isWatched}
        onPress={() => markComplete(season.id)}
        />
      </Right>
        </ListItem>
      ))
      }
      </List>
   </>
    )}

          <Text style={{color:"#ffffff"}}>List of seasons goes here</Text>  
    <Fab 
    style={{backgroundColor:"#5067FF"}}
    position="bottomRight"
    onPress={()=>  navigation.navigate('Add')}
    >
<Icon name="add" />
    </Fab>
    </ScrollView>

    )
}

export default Home

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
