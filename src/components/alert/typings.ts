export type IType = "success" | "info" | "warning" | "error"

interface IAlert {
    title: string,
    type: IType,
    showIcon: boolean,
    effect: "light" | "dark",
    center: boolean
}


export interface TypeEmits {
    (e: "clickEv"):void
}
export type IAlertAttr = Partial<IAlert>;

