export function reduceSynchronized<T, U>(array: T[], callback: (previous: U | undefined, current: T) => Promise<U>, start?: Promise<U>|U): Promise<U | undefined> {
  const initialValue: Promise<U | undefined> = Promise.resolve<U | undefined>(start);

  return array.reduce(
    (uPromise, t) => uPromise.then(u => callback(u, t)),
    initialValue
  );
}
