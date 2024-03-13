import { describe, test, expect ,vi, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import MGIcon from '../components/icon/index.vue';
import { message } from "../components/meesage-new/message";
import { IInstanceType } from '../components/meesage-new/typings.ts';
import { nextTick } from 'vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
let messages: NodeListOf<Element>;
let instances:IInstanceType[] = [];

describe('message.vue', () => {
    function waitFor(second:number) {
        return new Promise((resolve) => {
            setTimeout(()=>{
                resolve(true);
            }, second);
        });
    }
    async function transitionRun() {
        return new Promise((res) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(async () => {
                    res(null);
                    await nextTick();
                });
            });
        });
    }
    beforeAll(() => {
        instances = [ message({
            message: 'this is my message',
        }),
        message({
            message: 'this is my message',

        }),
        message({
            message: 'this is my message',
        }) ];
        messages = document.querySelectorAll('.mg-message--wrapper');
    });
    test('esc event should close all the message',async () => {
        await document.dispatchEvent(new MouseEvent('keyup.esc'));

        for(let i=0;i<3;i++) {
            expect(instances[i].vm.show).toBeFalsy();
        }
    });

    test('event should fire userClose call',async  () => {
        const userClose = vi.fn();
        const instances = [];
        for (let i = 0; i < 4; i++) {
            const instance = message({
                duration: 0,
                userClose,
                message: "number 1"
            });
            instances.push(instance);
        }

        await transitionRun();
        const elements = document.querySelectorAll(".mg-message--wrapper");
        expect(elements.length).toBe(7);
        instances[0].handler.close();


        await transitionRun();
        expect(userClose).toHaveBeenCalledTimes(1);
        expect(document.querySelectorAll(".mg-message--wrapper").length).toBe(6);

    });
});