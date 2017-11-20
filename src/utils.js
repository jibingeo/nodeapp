//Wrapper to catch exception
export const wrap = fn => (...args) => fn(...args).catch(args[2]);
