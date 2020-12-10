import * as React from 'react'
/** What can be typically passed as a prop to a component and later rendered with simple { props.value } */
export type ReactElem<P = {}> = React.ReactElement<P> | string | null; 

/** What a FunctionComponent can return. Convienient to force it sometimes to verify if you're components are correct. */
export type FunctionComponentResult<P = {}> = React.ReactElement<P> | null;

/** Shared set of props */
export interface CommonProps {
    className?: string,
    style?: React.CSSProperties
}

/** Shared set of props for components we want to define Height */
export interface CommonPropsWithHeight extends CommonProps {
    height?: number;
}

export interface CommonTableProps extends CommonPropsWithHeight {
    onRowClick?: (rowIndex: number, row: object) => void
}

export type BootstrapStyle = {primary?: boolean} | {success?: boolean} | {info?: boolean} | {danger?: boolean} | {warning?: boolean;}
export type BootstrapTextStyle = BootstrapStyle | {muted?: boolean}

// export interface BootstrapStyle {
//     primary?: boolean;
//     success?: boolean;
//     info?: boolean;
//     danger?: boolean;
//     warning?: boolean;
// }

// export interface BootstrapTextStyle extends BootstrapStyle {
//     muted?: boolean;
// }

export function getClassName(props: BootstrapTextStyle, baseClass: string, otherClassName?: string) {
    let suffix = "default"
    
    if ((props as any).primary) { suffix="primary" }
    if ((props as any).success) { suffix="success" }
    if ((props as any).info)    { suffix="info" }
    if ((props as any).danger)  { suffix="danger" }
    if ((props as any).warning) { suffix="warning" }
    if ((props as any).muted)   { suffix="muted" }
    
    return `${baseClass} ${baseClass}-${suffix}${otherClassName ? " " + otherClassName : ""}`;
}

export function validateProps(props: any) {
    let s = props.style as React.CSSProperties | undefined;

    if (s?.padding || s?.height || s?.paddingBottom || s?.paddingTop || s?.paddingLeft || s?.paddingRight ) {
        console.warn("You specified padding or height. This is illegal and is ignored.")

        delete s.padding;
        delete s.paddingLeft;
        delete s.paddingRight;
        delete s.paddingTop;
        delete s.paddingBottom;
        delete s.height;
    }
}

export function getHeight(height: number | 'auto' | undefined, defValue: number) {
    if (height==='auto' || height===undefined) {
        return defValue
    }

    return height;
}