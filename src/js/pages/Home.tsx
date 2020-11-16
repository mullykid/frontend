import * as React from "react";
import { useState, useContext, useEffect, createContext } from 'react'
import {PlayerDataGrid} from '../components/DataGrid'
import * as dataFunc from '../api/getData'
//import {iPlayer, getData} from '../../assets/api/getData'

export interface IHomeProps{
    loadData: boolean
}

export const Home = (props:IHomeProps) => {
    const [data, setData] = useState<dataFunc.iPlayer[]>([]);
    const getData = async () => {
        let data = await dataFunc.getTeamData()

       /* if (data){
            data.sort((a, b) => (a.second_name > b.second_name) ? 1 : -1)
            setData(data)
        }*/
    }
    
    useEffect(() => {getData()}, [props.loadData])

    return(
        <div>
            <PlayerDataGrid data={data} />
        </div>
    )
}