import { StateCreator, create as actualCreate } from 'zustand';

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => resetFn());
};

const registerStore = <T>(initializer: StateCreator<T>) => {
  const store = actualCreate<T>()(initializer);
  const initialState = store.getInitialState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

export const create = (<T>(initializer?: StateCreator<T>) => {
  if (initializer) return registerStore(initializer);
  return registerStore;
}) as typeof actualCreate;

