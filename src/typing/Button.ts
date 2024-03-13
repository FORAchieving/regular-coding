export type IShape = 'default'|"plain"|"round"|"circle";
export type IColor = "default"|"primary" | "success" | "info" | "warning" | "danger";
export type ISize = "large" | "default" | "small";
export type IType = "submit" | "reset" | "button"

export interface IProps{
    shape?:  IShape,
    color?: IColor,
    size?: ISize,
    disabled?:boolean
    type?:IType,
    icon?: string,
    loading?: boolean
}

export interface IEmits {
    (e: "btnClick") : void
}