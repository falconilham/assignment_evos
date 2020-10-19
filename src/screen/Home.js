import React, {useEffect, useState} from 'react'
import { Search, View, Card, ViewGrid, Modal, Spin, Text, Button } from '../component';
import axios from 'axios'

let endPoint = "https://swapi.dev/api/starships"

function Home(){
    let [searchName, setSearchName] = useState("")
    let [data, setData] = useState([])
    let [dataSearch, setDataSearch] = useState([])
    let [isLoading,setIsLoading] = useState(false)
    let [drawer,setDrawer] = useState({
        isOpen: false,
        id: ""
    })
    let getAllStarShip = () => {
        let dataHandler = [...data]
        setIsLoading(true)
        axios.get(endPoint).then((result) => {
            result.data.results.forEach(({films, pilots, ...item}) => {
                let newfilms = []
                let newPilots = []
                films.map((film) => axios.get(film).then(response => newfilms.push(response.data.title)))
                pilots.map((pilot) => axios.get(pilot).then(response => newPilots.push(response.data.name)))
                dataHandler.push({...item, films:newfilms, pilots: newPilots})
            })
            setData(dataHandler)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getAllStarShip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        getStarship(searchName)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchName])

    let getStarship = (param) => {
        let dataHandler = []
        axios.get(`${endPoint}/?search=${param}`).then((result) => {
            result.data.results.forEach(({films, pilots, ...item}) => {
                let newfilms = []
                let newPilots = []
                films.map((film) => axios.get(film).then(response => newfilms.push(response.data.title)))
                pilots.map((pilot) => axios.get(pilot).then(response => newPilots.push(response.data.name)))
                dataHandler.push({...item, films:newfilms, pilots: newPilots})
            })
            setDataSearch(dataHandler)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    let isBottom = (el) => {
        return Math.trunc(el.getBoundingClientRect().bottom) <= window.innerHeight;
    }

    useEffect(() => {
        window.addEventListener("scroll", trackScrolling);
        return () => window.removeEventListener("scroll", trackScrolling);
    })

    let trackScrolling = () => {
        const wrappedElement = document.getElementById('container');
        if (isBottom(wrappedElement)) {
          getAllStarShip()
          document.removeEventListener('scroll', trackScrolling);
        }
    };
    
    let selectedShip = data[drawer.id]
    return(
        <View id="container" style={{padding : '10px 50px'}}>
            <Search 
                    style={styles.search}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search By Name or model"
                />
                <ViewGrid style={{gridTemplateColumns: '1fr 1fr 1fr', gridGap: 10}}>
                    <Modal 
                        visible={drawer.isOpen}    
                        title={selectedShip?.name}
                        onCancel={() => setDrawer({isOpen: false, id: null})}
                        bodyStyle={{display: 'grid', gridRowGap: 10}}
                        footer={null}
                    >
                        {selectedShip && Object?.entries(selectedShip).map((item, i) => {
                            if(item[0] === "films" || item[0] === "pilots"){
                                return(
                                    <View style={styles.wrapperBetweenText} key={i}>
                                        <Text size="xxxSmall">{item[0].replace("_", " ")} :</Text>
                                            <View>
                                                {item[1].map((item, j) => (
                                                    <Text link key={j} size="xxxSmall">{item}</Text>
                                                ))}
                                            </View>
                                    </View>  
                                )
                            }
                            else{
                                return(
                                    <View style={styles.wrapperBetweenText} key={i}>
                                        <Text size="xxxSmall">{item[0].replace("_", " ")} :</Text>
                                        <Text link={item[0] === "url"} size="xxxSmall">{item[1]}</Text>
                                    </View>
                                )
                            }
                        })}
                    </Modal>
                    {(!searchName ? data : dataSearch).map(({name, model, manufacturer, ...rest}, i) => (
                        <Card hoverable onClick={() => setDrawer({isOpen: true, id: i})} key={i} title={name} bodyStyle={styles.card}>
                            <View style={styles.wrapperBetweenText}>
                                <Text size="xxSmall">Name</Text>
                                <Text style={{textAlign: 'left'}} size="xxSmall">{name}</Text>
                            </View>
                            <View style={styles.wrapperBetweenText}>
                                <Text size="xxSmall">Model</Text>
                                <Text style={{textAlign: 'left'}} size="xxSmall">{model}</Text>
                            </View>
                            <View style={styles.wrapperBetweenText}>
                                <Text size="xxSmall">Manufacture</Text>
                                <Text style={{textAlign: 'left'}} size="xxSmall">{manufacturer}</Text>
                            </View>
                        </Card>
                    ))}
                </ViewGrid>
            <Button style={styles.search} onClick={() => getAllStarShip()}>{isLoading ? (<Spin />) :'Get More Data'}</Button>
        </View>
    )
}

let styles= {
    wrapperBetweenText: {
        display: 'grid', 
        gridTemplateColumns: '50% 50%', 
        justifyItems: 'flex-start'
    },
    card:{
        display : 'grid', 
        alignItem: 'left'
    },
    search:{
        marginBottom: 20, 
        marginTop: 20,
        alignSelf: 'center', 
        width: '80%'
    }
}

export default Home