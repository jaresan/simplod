export const s_onPaperClick = () => {};
export const s_onCellClick = cellView => ({ cellView });
export const r_toggleCell = cellView => ({ cellView });
export const r_deselectAll = () => {};
export const r_toggleOptional = (id, optional) => ({ id, optional });
export const r_toggleShow = (id, show) => ({ id, show });
export const r_toggleDisabled = (id, disabled) => ({ id, disabled });
export const r_savePropertyName = (id, name) => ({ id, name });
export const r_unselectProperty = id => ({id});
