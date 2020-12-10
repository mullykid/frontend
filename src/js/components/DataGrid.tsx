import * as React from "react";
import DataGrid from 'react-data-grid';
import {useMemo, useState} from 'react'
import 'react-data-grid/dist/react-data-grid.css';
import {ITeamSummary} from '../pages/TeamSummary'
import {IPlayer} from '../api/getData'
import {LoadState, LoadIndicator} from '../components/LoadIndicator'
 
interface IDataGridProps {
  columns: any,
  height: number
  data: any
  loadState: LoadState
}

interface SummaryRow {
  id: string;
  totalCount: number;
}

export interface ITeamDataGridProps{
  data: ITeamSummary[]
  loadState: LoadState
  height: number
}

export interface IPlayerDataGridProps{
  data: IPlayer[]
  loadState: LoadState
  height: number
}

const teamSummaryColumns = [
  { key: 'title', name: 'Team', resizable: false, frozen: true, summaryFormatter() {
      return <strong>Total</strong>;
    }
  },
  { key: 'wins', name: 'Win', resizable: true, width: 80 },
  { key: 'draws', name: 'Draw', resizable: true, width: 80 },
  { key: 'loses', name: 'Loss', resizable: true, width: 80 },
  { key: 'scored', name: 'Scored', resizable: true, width: 80 },
  { key: 'missed', name: 'Against', resizable: true, width: 80 },  
  { key: 'goaldiff', name: 'Goal Diff', resizable: true, width: 80 },    
  { key: 'deep', name: 'Deep', resizable: true, width: 80 },
  { key: 'deep_allowed', name: 'Deep Allowed', resizable: true, width: 80 },
  { key: 'npxG', name: 'npxG', resizable: true, width: 80 },
  { key: 'npxGA', name: 'npxGA', resizable: true, width: 80 },
  { key: 'npxGD', name: 'npxGD', resizable: true, width: 80 },
  { key: 'xG', name: 'xG', resizable: true, width: 80 },
  { key: 'xGA', name: 'xGA', resizable: true, width: 80 },
  { key: 'pts', name: 'Points', resizable: true, width: 80 },
];
 
 
export const TeamDataGrid = (props: ITeamDataGridProps) => {
  return (
    <DataGridComponent
      columns={teamSummaryColumns}
      data={props.data}
      loadState={props.loadState}
      {...props}
    />
  );
}

const playerColumns = [
  { key: 'player_name', name: 'Player', resizable: false, frozen: true, summaryFormatter() {
      return <strong>Total</strong>;
    }
  },
  { key: 'team_title', name: 'Club', resizable: false, frozen: true},
  { key: 'position', name: 'Position', resizable: false, frozen: true},
  { key: 'games', name: 'Games', resizable: true, width: 80 },
  { key: 'time', name: 'Time', resizable: true, width: 80 },
  { key: 'goals', name: 'Goals', resizable: true, width: 80 },
  { key: 'xG', name: 'xG', resizable: true, width: 80 },
  { key: 'assists', name: 'Assists', resizable: true, width: 80 },  
  { key: 'xA', name: 'xA', resizable: true, width: 80 },    
  { key: 'shots', name: 'Shots', resizable: true, width: 80 },
  { key: 'key_passes', name: 'Key Passes', resizable: true, width: 80 },
  { key: 'yellow_cards', name: 'Yellow Cards', resizable: true, width: 80 },
  { key: 'red_cards', name: 'Red Cards', resizable: true, width: 80 },
  { key: 'npg', name: 'npg', resizable: true, width: 80 },
  { key: 'npxG', name: 'npXG', resizable: true, width: 80 },
  { key: 'xGChain', name: 'xGChain', resizable: true, width: 80 },
  { key: 'xGBuildup', name: 'xGBuildup', resizable: true, width: 80 },
];

export const PlayerDataGrid = (props: IPlayerDataGridProps) => {
  return (
    <DataGridComponent
      columns={playerColumns}
      data={props.data}
      loadState={props.loadState}
      {...props}
    />
  );
}

const DataGridComponent = (props: IDataGridProps) => {
  const summaryRows = useMemo(() => {
    const summaryRow: SummaryRow = { id: 'total_0', totalCount: props.data.length};
    return [summaryRow];
  }, [props.data]);

  
  const EmptyRowsView = () => {
    const message = "No data available";
    return (
      <div
        style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}
      >
        <h3>{message}</h3>
      </div>
    );
  };
  
  return (
    <DataGrid
      columns={props.columns}
      rows={props.data}
      summaryRows={summaryRows}
      emptyRowsRenderer={EmptyRowsView}     
      style={{ height: props.height}}  
    />
  );
}