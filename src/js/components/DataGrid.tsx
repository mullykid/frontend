import * as React from "react";
import DataGrid from 'react-data-grid';
import {useMemo, useState} from 'react'
import 'react-data-grid/dist/react-data-grid.css';
import {iPlayer} from '../api/getData'
 
interface IDataGridProps {
  columns: any,
  data: iPlayer[]
}

interface SummaryRow {
  id: string;
  totalCount: number;
}

export interface IPlayerDataGridProps{
  data: iPlayer[]
}

const playerColumns = [
  { key: 'first_name', name: 'First Name', resizable: false, width: 60, frozen: true, summaryFormatter() {
      return <strong>Total</strong>;
    }
  },
  { key: 'second_name', name: 'Second Name', resizable: true },
];
 
 
export const PlayerDataGrid = (props: IPlayerDataGridProps) => {
  return (
    <DataGridComponent
      columns={playerColumns}
      data={props.data}
    />
  );
}

const DataGridComponent = (props: IDataGridProps) => {
 // console.log(props.data)
  const summaryRows = useMemo(() => {
    const summaryRow: SummaryRow = { id: 'total_0', totalCount: props.data.length};
    return [summaryRow];
  }, [props.data]);


  return (
    <DataGrid
      columns={props.columns}
      rows={props.data}
      summaryRows={summaryRows}
    />
  );
}