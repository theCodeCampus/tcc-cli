export function reduceSynchronized<T, U>(array: T[], callback: (u: U, t: T) => Promise<U>, start?: Promise<U>|U): Promise<U> {
  return array.reduce(function(uPromise, t) {
    return uPromise.then(function(u) {
      return callback(u, t);
    });
  }, Promise.resolve(start));
}
