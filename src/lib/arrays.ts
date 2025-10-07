export function interweave<T, R = T>(arr: T[], factory: (t: T, i: number) => R): (T | R)[] {
    const res: (T | R)[] = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i]);
        if (i < arr.length - 1) {
            res.push(factory(arr[i], i));
        }
    }
    return res;
}
