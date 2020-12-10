import * as React from "react";
import { useState, useContext, useEffect, createContext } from 'react'
import {PlayerDataGrid} from '../components/DataGrid'
import {getPlayerData, IPlayer} from '../api/getData'
import {round2DecimalPlaces} from '../utils/FormatUtils'
import {useEffectToLoadData} from '../components/LoadIndicator'
import {GenericDataComponent} from '../components/GenericDataComponent'
//import {iPlayer, getData} from '../../assets/api/getData'

export interface IHomeProps{
    loadData: boolean
}

export const PlayerSummary = (props:IHomeProps) => {
    const [data, setData] = useState<IPlayer[]>([]);
    const getData = async () => {
        let data = await getPlayerData('epl',2020)
        if (data.length > 0){
            data.sort((a,b) => a.player_name > b.player_name ? 1 : -1); 
            setData(data)  
        }
        return data.length > 0
    }

    useEffect(() => {getData()}, [props.loadData])
    let loadState = useEffectToLoadData(getData, [props.loadData])

    return(
        <GenericDataComponent
            data={data}
            loadState={loadState}
            height={500}
            title={"Player Summary"}
            renderMode="div"
        >           
            <PlayerDataGrid 
                data={data} 
                height={800}
                loadState={loadState}
            />
        </GenericDataComponent>
    )
}