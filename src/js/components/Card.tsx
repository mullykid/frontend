import * as React from 'react';

import "./Card.css"
import { BootstrapStyle, CommonPropsWithHeight, FunctionComponentResult, validateProps, getClassName} from './ReactCommons';
//import { Hide } from './Hide';

const CardTitle = (props: {title?: string, titleSize: CardTitleSize}) => {
    let effectiveClassName = 'headerMedium'
    
    if (props.titleSize === 'small') { 
        effectiveClassName = 'headerSmall'
    }
    else if (props.titleSize === 'large') { 
        effectiveClassName = 'headerLarge'  
    }
    
    effectiveClassName += " cardHeader"

    if (props.title) {
        return (
            <div className={ effectiveClassName }>
                {props.title}
            </div>
        )
    }
    else {
        return null;
    }
}

export const Card = (props:CardProps) => {
    validateProps(props);

    let effectiveClassName = getClassName(props, "card", props.className);
    let effectiveBodyStyle: React.CSSProperties | undefined = props.height !== undefined ? {height: props.height}: undefined 

    return (
        <div className={ effectiveClassName } style={ props.style }>
            <CardTitle title={props.title} titleSize={props.titleSize || 'medium'} />

            {/*<Hide visible={props.children}>*/}
                <div className="cardContainer" style={ effectiveBodyStyle }>
                    { props.children }
                </div>
            {/*</Hide>*/}
        </div>
    )
}

export type CardProps = ICardProps & BootstrapStyle

export type CardTitleSize = 'small' | 'medium' | 'large'

export interface ICardProps extends CommonPropsWithHeight {
    title?: string,
    titleSize?: CardTitleSize,
    children?: any
}