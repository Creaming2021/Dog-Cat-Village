export function updateObject(state, updated) {
  return {
      ...state,
      ...updated
  };
}