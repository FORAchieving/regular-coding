
import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import Button from '../components/Button.vue';
import MGIcon from '../components/icon/index.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import '../fortawesome';


describe('Buuton.vue', () => {
    test('to mount Button', () => {
        const dom = mount(Button, {
            props: {
                shape: "circle",
                color: "danger",
                icon: "user-secret",
            },
            slots: { 'default': '<div style="fontSize: 16px">your<span>name</span></div>' },
            // 第三方组件替代方法
            global: {
                stubs: [ "MGIcon" ]
            }
        });

        expect(dom.get('button').classes()).toContain('mg-button-danger');
        expect(dom.get('button').classes()).toContain('mg-button-circle');
        dom.get('button').trigger('click');

        console.log('dom.emitted(): ', dom.emitted());
        expect(dom.emitted()).toHaveProperty('btnClick');
        // dom.get('button').text()： 获取button下，所有的文本
        expect(dom.get('button').text()).toBe('yourname');

        console.log(dom.html());
        expect(dom.findComponent(MGIcon).exists()).toBeTruthy();
        // console.log(dom.get('button').attributes()).;
    });

    test('to disabled Button', () => {
        const dom = mount(Button, {
            props: {
                disabled: true
            },
            slots: { 'default': '<div style="fontSize: 16px">name</div>' }
        });

        expect(dom.attributes('disabled')).toBeDefined();
        dom.get('button').trigger('click');
        expect(dom.emitted()).not.toHaveProperty('click');
    });
});