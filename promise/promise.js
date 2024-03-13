
import status from "./status";

function isThenable(value) {
    return value instanceof MyPromise;
}

function isFunction(callback) {
    return callback instanceof Function;
}
export default class MyPromise {
    constructor(callback) {
        this.status = status.PENGING;
        this.value = undefined;
        this.handlers = [];

        try {
            callback(this._resolve, this._reject);
        } catch (e) {
            this._reject(e);
        }
    }

    _resolve = value => {
        this.updateResult(value, status.FULLFILLED);
    };

    _reject = reason => {
        this.updateResult(reason, status.REJECTED);
    };

    updateResult(value, state) {
        if (this.status !== status.PENGING) return;

        if (isThenable(value)) {
            return value.then(this._resolve, this._reject);
        }

        this.value = value;
        this.status = state;

        this.executorHandler();
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.addHandler((value, state) => {
                try {
                    if (state === status.FULLFILLED) {
                        isFunction(onFulfilled) ? resolve(onFulfilled(value)) : resolve(value);
                    }
                    if (state === status.REJECTED) {
                        isFunction(onRejected) ? resolve(onRejected(value)) : reject(value);
                    }
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
    addHandler(callback) {
        this.handlers.push(callback);
        this.executorHandler();
    }
    executorHandler() {
        while(this.handlers.length) {
            const callback = this.handlers.shift();
            queueMicrotask(() => callback(this.value, this.status));
        }
    }
    catch(onFail) {
        return this.then(null, onFail);
    }
    finally(callback) {
        return new MyPromise((resolve, reject) => {
            this.addHandler((value, state) => {
                try {
                    callback();
                    state === status.FULLFILLED ? resolve(value) : reject(value);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}