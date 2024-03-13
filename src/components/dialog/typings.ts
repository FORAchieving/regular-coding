export interface IDialogType {
    modelValue: boolean,
    title?: string,
    showClose?: boolean,
    center?:boolean
}

export interface IDialogEmits {
    (e: "update:modelValue", modelValue: boolean): void,
    (e: "close"): void,
}

export type IDialogContentType = Omit<IDialogType, 'modelValue'>

export interface IDialogContentEmits {
    (e: "close"): void,
}

