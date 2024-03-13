const jobQueue = new Set();
const resolvePromise = Promise.resolve();
let flushing = false;
export function inQueue(job) {
    jobQueue.add(job);
}

export function flushStatus() {
    if (flushing) return;
    flushing = true;

    resolvePromise.then(() => {
        jobQueue.forEach(job => job());
    }).then(() => {
        flushing = false;
    });
}