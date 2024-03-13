import { Component } from 'vue';
export type NameType = number | string;
export type IUnionType = NameType | NameType[];

export  interface IItemType {
    name: string | number,
    title: string,
    content?: HTMLElement | Component| string,
};

export type IItems = Array<IItemType>