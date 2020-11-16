
import * as Fs from 'fs';
import * as parse from 'csv-parse';
import {authFetch} from '../api/Auth'

///The following API uses CORS Mode. An online CORS Proxy is required to successfully fetch the data. TO DO, setup own PROXY.

const proxyurl = "https://cors-anywhere.herokuapp.com/";
let FPL_URL = 'https://fantasy.premierleague.com/api/bootstrap-static/'

export interface iPlayer{
    "chance_of_playing_next_round": number,
    "chance_of_playing_this_round": any,
    "code": number,
    "cost_change_event": number,
    "cost_change_event_fall": number,
    "cost_change_start": number,
    "cost_change_start_fall": number,
    "dreamteam_count": number,
    "element_type": number,
    "ep_next": string,
    "ep_this": string,
    "event_points": number,
    "first_name": string,
    "form": string,
    "id": number,
    "in_dreamteam": boolean,
    "news": string,
    "news_added": string,
    "now_cost": number,
    "photo": string,
    "points_per_game": number,
    "second_name": string,
    "selected_by_percent": number,
    "special": boolean,
    "squad_number": number,
    "status": string,
    "team": number,
    "team_code": number,
    "total_points": number,
    "transfers_in": number,
    "transfers_in_event": number,
    "transfers_out": number,
    "transfers_out_event": number,
    "value_form": number,
    "value_season": number,
    "web_name": String,
    "minutes": number,
    "goals_scored": number,
    "assists": number,
    "clean_sheets": number,
    "goals_conceded": number,
    "own_goals": number,
    "penalties_saved": number,
    "penalties_missed": number,
    "yellow_cards": number,
    "red_cards": number,
    "saves": number,
    "bonus": number,
    "bps": number,
    "influence": number,
    "creativity": number,
    "threat": number,
    "ict_index": number,
    "influence_rank": number,
    "influence_rank_type": number,
    "creativity_rank": number,
    "creativity_rank_type": number,
    "threat_rank": number,
    "threat_rank_type": number,
    "ict_index_rank": number,
    "ict_index_rank_type": number,
    "corners_and_indirect_freekicks_order": null,
    "corners_and_indirect_freekicks_text": string,
    "direct_freekicks_order": any,
    "direct_freekicks_text": string,
    "penalties_order": any,
    "penalties_text": string
}

interface IPlayers {
    players: iPlayer[]
}

//fantasy.premierleague.com/entry/3588868/event/21/ TEAM ENTRY

export async function getData() {
    let headers = new Headers();
    let players: iPlayer[] = []

    headers.append('Content-Type', 'application/json');

    try {
        //const res = await fetch(this.conn.url);
        let response = await fetch(proxyurl+FPL_URL, 
            {
                headers: headers
            })
            .then(response => response.json())
            
        if (response){
            players = response["elements"]
        }

        return players

    }
    catch (error) {
        console.log(error + " response accessing" + FPL_URL)
    };
}

function readCsv(file: string){
    let csvParser = parse({delimiter: this.separator, from_line: this.fromLine, columns:true, bom: true, skip_empty_lines: true});

    let csvStream = Fs.createReadStream(file)
        .on( "error", (e) => { throw(e) } )
        .on('data', (row) => {
            console.log(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        })
        .pipe(csvParser)
        //.pipe(transform)
}

export async function getTeamData(){
    let headers = new Headers();
    let players: iPlayer[] = []

    headers.append('Content-Type', 'application/json');

    try {
        //const res = await fetch(this.conn.url);
        let response = await authFetch('/api/team_stats',{
            team: 'Everton'
        })
    
        if (response){
            console.log(response)
        }//// 
        return response

    }
    catch (error) {
        console.log(error + " response accessing" + '/api/team_stats')
    };

}