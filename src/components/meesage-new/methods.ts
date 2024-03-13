export function closeMsgfor(duration:number, callback:() => any):ReturnType<typeof setTimeout> | undefined {
    if (duration === 0) return;
    const timer = setTimeout(() => {
        callback();
    }, duration);

    return timer;
}


export function cancelCloseMsg(timer:ReturnType<typeof setTimeout> | undefined) {
    clearTimeout(timer);
}