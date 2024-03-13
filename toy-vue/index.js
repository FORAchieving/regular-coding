const obj = { 'a': 8, 'b': 10, 'c': 200 };
const ITERATOR = Symbol();
const TYPE = {
    'ADD': 'add',
    'DELETE': 'delete',
    'SET': 'set'
};
const bucket = new WeakMap();
let activeEffect,effectStack=[];
export function reactive(data) {
    return new Proxy(data, handler);
};

const handler = {
    get(target, key, receiver) {
        if (key === 'raw') {
            return target;
        }
        track(target, key);
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver){
        // 对象原型继承时，设置子元素没有而父元素有的属性时，会导致父元素绑定的副作用函数执行
        if (receiver.raw !== target) return true;
        const oldValue = target[key];
        // 新旧值不相等时触发更新
        if (oldValue === value && !(oldValue === oldValue && value === value)) return true;

        const isOwnKey = target.hasOwnProperty(key);
        // 判断 for ... in 操作绑定的副作用函数是否执行
        // add 执行，set 不执行
        const type = isOwnKey ? TYPE.SET : TYPE.ADD;
        Reflect.set(target, key, value, receiver);
        trigger(target, key, type);
        return true;
    },
    has(target, key) {
        return Reflect.has(target, key);
    },
    ownKeys(target) {
        track(target, ITERATOR);
        return Reflect.ownKeys(target);
    },
    deleteProperty(target, key) {
        const isOwnKey = target.hasOwnProperty(key);
        const type = isOwnKey && TYPE.DELETE;
        if (isOwnKey) {
            Reflect.deleteProperty(target, key);
            trigger(target, key, type);
        }
        return true;
    }
};

function track(target, key) {
    if (!activeEffect) return;

    let effectMap = bucket.get(target);
    if (!effectMap) {
        bucket.set(target, (effectMap = new Map()));
    }

    let effectDeps = effectMap.get(key);
    if (!effectDeps) {
        effectMap.set(key, (effectDeps = new Set()));
    }

    effectDeps.add(activeEffect);
    activeEffect.keyDeps.add(effectDeps);
}

function trigger(target, key, type, receiver) {
    const _bucket = bucket.get(target);
    if(!_bucket) return;
    const effects = new Set(_bucket.get(key));
    const effectsToRun = [];
    const iteratorEffects= new Set(_bucket.get(ITERATOR));
    if (type === TYPE.ADD || TYPE.DELETE === type) {
        iteratorEffects.forEach(iteratorEffect => effectsToRun.push(iteratorEffect));
    }

    effects.forEach(effect => {
        if(effect !== activeEffect) {
            effectsToRun.push(effect);
        }
    });


    effectsToRun.forEach(effect => {
        if (effect.options?.scheduler) effect.options.scheduler(effect);
        else effect();
    });
}



export function effect(fn, options) {
    const effectFn = () => {
        activeEffect = effectFn;
        cleanup(effectFn);
        effectStack.push(effectFn);
        const res = fn();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    };

    effectFn.keyDeps = new Set();
    effectFn.options = options;
    if (options && options.lazy) {
        return  effectFn;
    }
    return effectFn();
}

function cleanup(effectFn) {
    effectFn.keyDeps.forEach(effects => {
        effects.delete(effectFn);
    });
    effectFn.keyDeps = new Set();
}

export function computed(getter) {
    let dirty = true;
    let val;

    const effectFn = effect(getter, {
        lazy: true,
        scheduler() {
            dirty = true;
            trigger(obj, "value");
        }
    });
    const obj = {
        get value() {
            if (dirty) {
                val = effectFn();
            }
            dirty = false;
            track(obj, "value");
            return val;
        }
    };
    return obj;
}

// 只考虑 watch 对象的情况
function reverse(obj) {
    console.log('obj: ', obj);
    for(let key in obj) {
        obj[key];
    }
    return obj;
}
export function watch(value, callback, options) {
    console.log('value: ', value);
    let oldValue;
    let newValue;
    if (options?.immediate) {
        callback(value, oldValue);
    }
    oldValue = value;
    effect(() => reverse(value), {
        scheduler(fn) {
            newValue = fn();
            callback(newValue, oldValue);
            oldValue = newValue;
        }
    });
    // oldValue = value;
}

