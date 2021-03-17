import React,{useState,useEffect} from 'react'
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
    Spinner,Form,Item,Input
  } from 'native-base'
  import {StyleSheet,ScrollView} from "react-native"
  import AsyncStorage from "@react-native-community/async-storage";


const Edit = ({navigation,route}) => {
    const [name, setname] = useState("")
    const [totalNoSeason, settotalNoSeason] = useState("")
    const [id, setId] = useState(null)
   
const update = async () => {
    try {
        if(!name || !totalNoSeason){
            return alert ("Please enter value in both field")
            //Add snackbar 
        }
    const seasontoUpdate = {
        id,
        name,
        totalNoSeason,
        isWatched:false
    }
    const storedValue = await AsyncStorage.getItem("@season_list")
const list = await JSON.parse(storedValue)

list.map(singleSeason => {
    if(singleSeason.id == id)
    {
        singleSeason.name = name;
        singleSeason.totalNoSeason= totalNoSeason;
    }
    return singleSeason
})

await AsyncStorage.setItem("@season_list",JSON.stringify(list))
navigation.navigate("Home")    
}
        catch(err){
            console.log(err)
        }
    
}

useEffect(() => {
console.log("ANSWER")
  
    const {season} = route.params
const {id,name,totalNoSeason} = season

console.log("ANSWER" + id,name,totalNoSeason)
setId(id)
setname(name)
settotalNoSeason(totalNoSeason)

}, [])

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
value={name}

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
<Button rounded block onPress={update}><Text style={{color:"#eee"}}>Update</Text></Button>
</Form>
</ScrollView>
    </Container >
)
}

export default Edit


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