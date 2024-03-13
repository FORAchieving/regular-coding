import { describe, test, expect, vi, beforeAll } from 'vitest';
import { VueWrapper, mount, DOMWrapper } from '@vue/test-utils';
import MGIcon from '../components/icon/index.vue';
import Message from '../components/meesage-new/index.vue';
import { nextTick } from 'vue';
import type { ComponentInternalInstance } from 'vue';
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

let dom:VueWrapper;
let infoIcon: DOMWrapper<Element>;
let message: DOMWrapper<Element>;
let closeIcon: DOMWrapper<Element>;



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
        dom = mount(Message, {
            props: {
                message: "this is my first message",
                id: 1,
            },
            global: {
                stubs: [ 'MGIcon' ]
            }
        });
    });

    test('show right text', () => {
        infoIcon = dom.find('.mg-message--icon');
        message = dom.find('.mg-message--content');
        closeIcon = dom.find('.mg-message--close');

        expect((infoIcon.getCurrentComponent() as ComponentInternalInstance).props.icon).toBe('circle-info');
        expect(message.text()).toBe('this is my first message');
        expect(closeIcon.exists()).not.toBeTruthy();
        expect(dom.vm.$props.duration).toBe(3000);
        expect(dom.vm.$props.id).toBe(1);

        expect(ResizeObserver).toHaveBeenCalledTimes(1);
    });

    test('show right messagebox', async () => {

        const dom = mount(Message, {
            props: {
                message: "this is my first message",
                id: 1,
                duration: 2000
            },
            global: {
                stubs: [ 'MGIcon' ]
            }
        });
        expect(dom.vm.$props.duration).toBe(2000);
        expect(dom.exists()).toBeTruthy();
        expect(dom.vm.show).toBeTruthy();

        await waitFor(4000);
        expect(dom.exists()).toBeTruthy();
        expect(dom.vm.show).toBeFalsy();
    });


    test('event', async () => {
        const dom = mount(Message, {
            props: {
                message: "this is my first message",
                id: 1,
                showClose: true,
            },
            global: {
                stubs: [ 'MGIcon' ]
            }
        });

        const closeDom = dom.find('.mg-message--close');
        expect(dom.vm.$props.showClose).toBeTruthy();
        expect(closeDom.exists()).toBeTruthy();
        expect(dom.vm.show).toBeTruthy();
        await closeDom.trigger('click');
        expect(dom.vm.show).toBeFalsy();

    });

    test('it should close when esc is pressed', async () => {
        const dom = mount(Message, {
            props: {
                message: "this is my first message",
                id: 1,
            },
            global: {
                stubs: [ 'MGIcon' ]
            },
            attachTo: document.body
        });
        expect(dom.vm.show).toBeTruthy();
        dom.trigger('keyup.esc');

        expect(dom.vm.show).toBeFalsy();
    });
});