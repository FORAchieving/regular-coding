import axios from 'axios';

interface Ifn {
    "showName": (name:string) => void,
}

export function testCallback(num:number, callback:Function) {
    if (num > 10) callback();
}

type IVal = number | string ;
type IObj =  Ifn | Record<string, IVal>;
export const obj:IObj = {
    "showName": (name:string) => {return name;},
    "age": 12,
    "name": "maggie"
};

export async function  testRequest() {
    const { data } = await axios.get('path/url');
    return  data;
}