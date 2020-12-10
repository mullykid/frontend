import * as React from "react";
import Panel from "./Panel";
import { Card } from "./Card";

//import "./GenericDataComponent.css"
import { LoadState, LoadIndicator } from "./LoadIndicator";

//const WAIT_IMG = '/img/Wait.gif'

export class GenericDataComponent extends React.Component<IGenericDataComponentProps> {
    constructor(props: IGenericDataComponentProps) {
        super(props);
    }
    render() {
        let OuterComponent: any
        if (this.props.renderMode === "panel") {
            OuterComponent = OuterPanel
        }
        else if (this.props.renderMode === "card") {
            OuterComponent = OuterCard
        }
        else {
            OuterComponent = OuterDiv
        }

        return (
            <OuterComponent {...this.props}>
                <RenderInside loadState={this.props.loadState} data={this.props.data} noDataMsg={this.props.noDataMsg}>
                    {this.props.children}
                </RenderInside>
            </OuterComponent>
        )
    }
}

const OuterPanel = ({ children, ...props }: { style: any, children: any, className?: string, title?: string, height?: number }) => {
    return (
        <Panel {...props}>
            {children}
        </Panel>
    )
}

const OuterCard = ({ children, ...props }: { style: any, children: any, className?: string, title?: string, height?: number }) => {
    return (
        <Card {...props}>
            {children}
        </Card>
    )
}

const OuterDiv = (props: { style: any, children: any, className?: string, title?: string, height?: number | string }) => {

    return (
        <div style={{height: props.height}} className={props.className}>
            <h3>{props.title}</h3>

            {props.children}
        </div>
    )
}

const RenderInside = (props: { data: any, loadState?: LoadState, noDataMsg?: React.ReactElement | null | string, children: any }) => {
    if (props.loadState == LoadState.OK) {
        return props.children;
    }
    else{
        return (<LoadIndicator loadState={props.loadState}/>)
    }
}

export interface IGenericDataComponentProps {
    renderMode?: 'panel' | 'card' | 'div';
    noDataMsg?: React.ReactElement | string | null | undefined;
    title?: string;
    titleSize?: 'small' | 'medium' | 'large'
    height: number,
    loadState?: LoadState
    data?: any;
}




