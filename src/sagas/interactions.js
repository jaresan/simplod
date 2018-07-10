import { takeEvery, put, take, select } from 'redux-saga/effects';
import { getSelectedDataAndPrefixes } from 'src/selectors';
import Actions from 'src/actions';

function* updateQuery() {
	const { classes, prefixes } = yield select(getSelectedDataAndPrefixes);
	yield put(Actions.Creators.r_updateQuery(classes, prefixes));
}

function* onPaperClick() {
	yield put(Actions.Creators.r_deselectAll());
	yield updateQuery();
}

function* onCellClick(action) {
	const cellView = action.payload.cellView;
	yield put(Actions.Creators.r_toggleCell(cellView));
	yield updateQuery();
}


export default function*() {
	yield [
		takeEvery(Actions.Types.s_onPaperClick, onPaperClick),
		takeEvery(Actions.Types.s_onCellClick, onCellClick)
	];
}