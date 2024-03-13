import { Component, Ref, InjectionKey } from 'vue';
import CollapseItem from './item.vue';
import Collapse from './index.vue';
export type CollapseInstance = InstanceType<typeof Collapse>
export type CollapseItemInstance = InstanceType<typeof CollapseItem>

export type NameType = number | string;
export type IUnionType = NameType | NameType[];

export interface ICollapseItem {
    name: NameType,
    title?: string,
    content?: HTMLElement | Component| string,
 }


export interface IModelValue{
    modelValue: IUnionType;
}

export interface ICollapseProvide{
    activeNames:IUnionType,
    handleClick:(name:NameType) => void
 }



export interface IAccordion{
    accordion?: boolean;
}

export type ICollapseProps = IModelValue & IAccordion;

export interface IModelEmits {
    (e: "update:modelValue", modelValue: IUnionType): void;
    (e: "changeEv", activeNames: IUnionType): void;
}

// export interface InjectionKey<T> extends Symbol {}
// 继承了Symbol，所以可以等于Symbol的值
export const collapseKey:InjectionKey<ICollapseProvide>= Symbol('collapseKey');
