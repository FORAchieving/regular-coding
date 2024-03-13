import { beforeAll, describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Collapse from '../components/collapse/index.vue';
import CollapseItem from "../components/collapse/item.vue";
import type { VueWrapper, DOMWrapper } from '@vue/test-utils';
import { CollapseItemInstance } from '../components/collapse/tyings';

let wrapper: VueWrapper;
let headerDom: DOMWrapper<Element>[];
let contentDom:DOMWrapper<Element>[];
let collapseWrapper:VueWrapper;
let collapseItemWrappers: VueWrapper<CollapseItemInstance>[];
const onChange = vi.fn();


describe('collapse.vue  ', () => {
    beforeAll(() => {
        wrapper = mount({
            render() {
                return (<Collapse modelValue={[ 'a' ]} onChangeEv={onChange}>
                    <CollapseItem name="a">
                        {{
                            title: () => "this is a content",
                            default: () => "detail for a"
                        }}
                    </CollapseItem>
                    <CollapseItem name="b">
                        {{
                            title: () => "this is b content",
                            default: () => "detail for b"
                        }}
                    </CollapseItem>
                    <CollapseItem name="c">
                        {{
                            title: () => "this is b content",
                            default: () => "detail for b"
                        }}
                    </CollapseItem>
                </Collapse>);
            }
        }
        ,{
            global: {
                stubs: [ 'MGIcon' ]
            },
            // 挂载到指定的dom节点，避免点击事件发生后，dom未更新
            attachTo: document.body
        }
        );

        // console.log(wrapper.html());

        collapseWrapper = wrapper.findComponent(Collapse);
        collapseItemWrappers = collapseWrapper.findAllComponents(
            CollapseItem
        ) as VueWrapper<CollapseItemInstance>[];

        // console.log('headerDom: ', collapseItemWrappers[0].vm.isActive);
        headerDom = wrapper.findAll('.mg-collapse-item__header');
        contentDom = wrapper.findAll('.mg-collapse-item__content');
    });

    test('collapse basic', async () => {
        expect(headerDom.length).toBe(3);
        expect(contentDom.length).toBe(3);

        expect(headerDom[0].text()).toBe('this is a content');
        expect(contentDom[0].text()).toBe('detail for a');
    });

    test('collapse rule', () => {
        expect(contentDom[0].isVisible()).toBeTruthy();
        expect(contentDom[1].isVisible()).toBeFalsy();
        expect(onChange).not.toHaveBeenCalled();
    });

    test('collapse event', async () => {
        // 点击事件需要异步等待dom更新，需要指定attcheTo的节点
        await headerDom[0].trigger('click');
        // console.log(wrapper.html());
        expect(contentDom[0].isVisible()).toBeFalsy();
        expect(contentDom[1].isVisible()).toBeFalsy();
        expect(contentDom[2].isVisible()).toBeFalsy();
        expect(onChange).toHaveBeenCalledTimes(1);

        await headerDom[1].trigger('click');
        console.log('headerDom: ', wrapper.html());
        expect(contentDom[0].isVisible()).toBeFalsy();
        expect(contentDom[1].isVisible()).toBeTruthy();
        expect(contentDom[2].isVisible()).toBeFalsy();
        expect(onChange).toHaveBeenCalledTimes(2);

        await headerDom[0].trigger('click');
        expect(collapseItemWrappers[0].vm.isActive).toBeTruthy();
        expect(collapseItemWrappers[1].vm.isActive).toBeTruthy();
        expect(collapseItemWrappers[2].vm.isActive).toBeFalsy();
    });

});

describe('collapse.vue accordion', () => {
    beforeAll(() => {
        onChange.mockClear();
        wrapper = mount(() => (
            <Collapse accordion modelValue={'a'} onChangeEv={onChange}>
                <CollapseItem name="a">
                    {{
                        title: () => "this is a content",
                        default: () => "detail for a"
                    }}
                </CollapseItem>
                <CollapseItem name="b">
                    {{
                        title: () => "this is b content",
                        default: () => "detail for b"
                    }}
                </CollapseItem>
                <CollapseItem name="c">
                    {{
                        title: () => "this is b content",
                        default: () => "detail for b"
                    }}
                </CollapseItem>
            </Collapse>
        ), {
            global: {
                stubs: [ 'MGIcon' ]
            },
            attachTo: document.body
        });

        headerDom = wrapper.findAll('.mg-collapse-item__header');
        contentDom = wrapper.findAll('.mg-collapse-item__content');
        collapseWrapper = wrapper.findComponent(Collapse);
        collapseItemWrappers = wrapper.findAllComponents(CollapseItem);
    });

    test('collapse basic', () => {
        expect(headerDom.length).toBe(3);
        expect(contentDom.length).toBe(3);

        expect(headerDom[0].text()).toBe('this is a content');
        expect(contentDom[0].text()).toBe('detail for a');

        expect(onChange).not.toHaveBeenCalled();
    });

    test('collapse event', async () => {
        expect(contentDom[0].isVisible()).toBeTruthy();
        await headerDom[0].trigger('click');
        expect(onChange).toHaveBeenCalledTimes(1);

        expect(contentDom[0].isVisible()).toBeFalsy();
        expect(contentDom[1].isVisible()).toBeFalsy();
        expect(contentDom[2].isVisible()).toBeFalsy();


        await headerDom[1].trigger('click');
        expect(onChange).toHaveBeenCalledTimes(2);

        expect(contentDom[0].isVisible()).toBeFalsy();
        expect(contentDom[1].isVisible()).toBeTruthy();
        expect(contentDom[2].isVisible()).toBeFalsy();
        expect(collapseItemWrappers[0].vm.isActive).toBeFalsy();
        expect(collapseItemWrappers[1].vm.isActive).toBeTruthy();
        expect(collapseItemWrappers[2].vm.isActive).toBeFalsy();

        await headerDom[1].trigger('click');
        expect(onChange).toHaveBeenCalledTimes(3);

        expect(contentDom[0].isVisible()).toBeFalsy();
        expect(contentDom[1].isVisible()).toBeFalsy();
        expect(contentDom[2].isVisible()).toBeFalsy();

        expect(collapseItemWrappers[0].vm.isActive).toBeFalsy();
        expect(collapseItemWrappers[1].vm.isActive).toBeFalsy();
        expect(collapseItemWrappers[2].vm.isActive).toBeFalsy();

    });
});