import * as React from 'react';
import { useEffect, useState } from 'react';
import "./LoadIndicator.css"
import { hash } from '../utils/ObjectUtils';

export enum LoadState {
    ERROR,
    LOADING,
    NO_DATA,
    OK
}

export const LoadIndicator = (props: ILoadIndicatorProps) => {
    switch (props.loadState) {
        case LoadState.ERROR:
            return (<div className="statusContainer"><div className="status well text-danger">Error while loading data</div></div>)
        case LoadState.LOADING:
            return (<div className="statusContainer"><div className="status pleaseWaitImage" /></div>)
        case LoadState.NO_DATA:
            return (<div className="statusContainer"><div className="status well text-primary">No data available</div></div>)
        case LoadState.OK:
            return (<div></div>)
    }
}

export interface ILoadIndicatorProps {
    loadState: LoadState,
}

export const useEffectToLoadData = (loadDataCallback: () => (Promise<boolean> | boolean), triggerPoint?: any[]) => {
    const [ loadState, setLoadState ] = useState<LoadState>(LoadState.LOADING)

    const triggerPointHashed = triggerPoint?.map(v => hash(v));

    useEffect( () => {
        (async () => {
            try {
                setLoadState(LoadState.LOADING);
                setLoadState(await loadDataCallback() ? LoadState.OK : LoadState.NO_DATA)
            }
            catch (error) {
                console.error("Error while loading the data.", error);
        
                setLoadState(LoadState.ERROR);
            }
        })();
    }, triggerPointHashed)    

    return loadState;
}
