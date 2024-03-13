import { describe, expect, test, vi, Mocked } from 'vitest';
import { testCallback, obj, testRequest } from './utils';
import axios from 'axios';
vi.mock('axios');

const mockAxios = axios as Mocked<typeof axios>;

// 你可以使用 vi.fn 方法创建一个间谍函数（mock）来跟踪其执行。如果要跟踪已创建对象上的方法，可以使用 vi.spyOn 方法
// 针对Vue组件的测试，只用vitest还不够，可以使用以下两种：
// Vue test Utils
// Vue Testing Library


describe('test practise', () => {

    test('callback nor not', () => {
        const cb = vi.fn();
        const num = 13;
        testCallback(num, cb);

        expect(cb).toHaveBeenCalled();
        // expect(cb).toHaveBeenCalledWith(num);
    });

    test('callback on object', () => {
        // implemanetion 的优先级比函数调用的优先级高
        const spy = vi.spyOn(obj, 'showName').mockImplementation(() => 'vince');

        expect((obj.showName as Function)('maggie')).toBe('vince'); // ✅
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveReturnedWith('vince');// ✅
        // expect(spy).toHaveReturnedWith('maggie');// ❌
    });

    test('request test', async () => {
        const data = { age: 23 };

        // mockAxios.get.mockResolvedValue({ data });
        vi.spyOn(axios, 'get').mockResolvedValue({ data });
        const res = await testRequest();
        expect(res).toBe(data);
    });


});