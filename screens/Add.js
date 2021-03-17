import React,{useState} from 'react'
import {Text,ScrollView,StyleSheet} from 'react-native'
import {Container,Form,Item,Input,Button,H1} from 'native-base'

import shortid from 'shortid'
import AsyncStorage from "@react-native-community/async-storage";


const Add = ({navigation}) => {
const [name,setname] = useState('')
const [totalNoSeason,settotalNoSeason] = useState('')

const addtoList = async () => {
    try{
        if(!name || !totalNoSeason){
            return alert("Please add both")
 //add snackbar here

        }
        const seasonToAdd = {
            id:shortid.generate(),
            name:name,
            totalNoSeason:totalNoSeason,
            isWatched:false
        }

const storedValue = await AsyncStorage.getItem("@season_list")
const prevList = await JSON.parse(storedValue)

if(!prevList) {
    const newList = [seasonToAdd]
    await AsyncStorage.setItem("@season_list",JSON.stringify(newList))
}else{
    prevList.push(seasonToAdd)
    await AsyncStorage.setItem("@season_list",JSON.stringify(prevList))

}
navigation.navigate("Home")
    }catch(err){console.log(err)}
}

    return (
        <Container style={styles.container}>
<ScrollView>
<H1 style={styles.heading}> Add to watch list</H1>
<Form>
<Item rounded style={styles.formItem}>
<Input 
placeholder= "Seasons name"
style={{color:"#eee"}}
onChangeText={(text)=> setname(text)}

/>
</Item>
</Form>
<Form>
<Item rounded style={styles.formItem}>
<Input 
placeholder= "Total no of seasons"
style={{color:"#eee"}}
value={totalNoSeason}
onChangeText={(txt)=> settotalNoSeason(txt)}
/>
</Item>
<Button rounded block onPress={addtoList}><Text style={{color:"#eee"}}>Add</Text></Button>
</Form>
</ScrollView>

        </Container >
    )
}

export default Add
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});


