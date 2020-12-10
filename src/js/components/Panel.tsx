import * as React from 'react';

import "./Panel.css";
import {CommonPropsWithHeight, getClassName, BootstrapStyle, validateProps} from './ReactCommons';

export const Panel = (props: PanelProps & BootstrapStyle) => {
    validateProps(props);

    let effectiveClassName = getClassName(props, "card", props.className);
    let effectiveBodyStyle: React.CSSProperties | undefined = props.height !== undefined ? ({ height: props.height }) : undefined;

    return (
        <div className={effectiveClassName} style={props.style}>
            <PanelTitle title={props.title} />
            
            <div className="card-body" style={effectiveBodyStyle}>
                {props.children}
            </div>
        </div>
    )
}

const PanelTitle = (props: {title: string | undefined}) => {
    if (props.title) {
        return (                
            <div className="card-heading">
                <h3 className="card-title">{props.title}</h3>
            </div>
        )
    }
    else {
        return null
    }
} 

export interface PanelProps extends CommonPropsWithHeight {
    title?: string;
    children: any;
}

export default Panel;
