import * as React from "react";
import { useState, useContext, useEffect, createContext } from 'react'
import {TeamDataGrid} from '../components/DataGrid'
import {getTeamData, ITeam, ITeamHistory} from '../api/getData'
import {round2DecimalPlaces} from '../utils/FormatUtils'
import {useEffectToLoadData} from '../components/LoadIndicator'
import {GenericDataComponent} from '../components/GenericDataComponent'
//import {iPlayer, getData} from '../../assets/api/getData'

export interface IHomeProps{
    loadData: boolean
}

export interface ITeamSummary {
    id: string,
    title: string,
    deep?: number,
    deep_allowed?: number,
    draws?: number,
    loses?: number,    
    npxG?: number, //expected goals without penalties and own goals
    npxGA?: number, //expected goals without penalties and own goals against
    npxGD?: number, //npxG - npxGA
    pts?: number,
    scored?: number,  //goals scored.
    missed?: number, //goals against.
    goaldiff?: number,
    wins?: number,
    xG?: number,    //expected goals
    xGA?: number,   //expected goals against
    xpts?: number
}

export const TeamSummary = (props:IHomeProps) => {
    const [data, setData] = useState<ITeamSummary[]>([]);
    const getData = async () => {
        let data = await getTeamData('epl',2020)
        if (data){
            let teamResults: ITeamSummary[] = []
            data.forEach((v:ITeam, i:number) => {          
                let team: ITeamSummary = {id:"", title:"", pts: 0, scored: 0, wins: 0, loses: 0, draws: 0, missed:0, goaldiff: 0, deep:0, deep_allowed:0, xpts:0, xG:0, xGA:0, npxG:0, npxGA:0, npxGD:0 }
                team.id = v.id
                team.title = v.title
                v.history.forEach((v:ITeamHistory, i:number) => {
                    team.pts += v.pts
                    team.scored += v.scored
                    team.wins += v.wins
                    team.loses += v.loses
                    team.draws += v.draws   
                    team.missed += v.missed 
                    team.deep += v.deep
                    team.deep_allowed += v.deep_allowed                 
                    team.xpts += v.xpts
                    team.xG += v.xG
                    team.xGA += v.xGA                    
                    team.npxG += v.npxG
                    team.npxGA += v.npxGA
                    team.npxGD += v.npxGD
                    team.goaldiff += (v.scored - v.missed)
                })
                /*team.xG = round2DecimalPlaces(team.xG / v.history.length)
                team.xGA = round2DecimalPlaces(team.xGA / v.history.length)
                team.npxG = round2DecimalPlaces(team.npxG / v.history.length)
                team.npxGA = round2DecimalPlaces(team.npxGA / v.history.length)
                team.npxGD = round2DecimalPlaces(team.npxGD / v.history.length)*/
                teamResults.push(team)
            })
            teamResults.sort((a, b) => b.pts - a.pts || b.goaldiff - a.goaldiff)
            
            setData(teamResults)
            return teamResults.length > 0
        }
    }
    useEffect(() => {getData()}, [props.loadData])
    let loadState = useEffectToLoadData(getData, [props.loadData])
    return(
        <GenericDataComponent
            data={data}
            loadState={loadState}
            height={500}
            title={"Team Summary"}
            renderMode="div"
        >           
            <TeamDataGrid 
                data={data} 
                height={800}
                loadState={loadState}
            />
        </GenericDataComponent>
    )
}