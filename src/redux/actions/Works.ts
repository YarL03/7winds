import { IRowScheme, UpdateRowScheme } from './../../shared/models/Row.interface';
import OUTLAY_API from './../../api/api';
import { DELETE_ROW, DISABLE_ROWS, PREPARE_ROW, SET_FORM_REF, SET_TREE_ROWS, UPDATE_ROW } from "../constants/Works";
import { IDeleteRowAction, IDisableRowsAction, IPrepareRowAction, ISetTreeRowsAction, IUpdateAfterCreation, IUpdateRowAction } from './Works.interface';

export const setFormRef = (formRef: any) =>  ({
    type: SET_FORM_REF,
    formRef
})

export const setTreeRows = (treeRows: any): ISetTreeRowsAction => ({
    type: SET_TREE_ROWS,
    treeRows
})

export const updateAfterCreation = (updates: any, parentId: any): IUpdateAfterCreation => ({
    type: UPDATE_ROW,
    updates,
    parentId
})

export const updateRowAC = (updates: any): IUpdateRowAction => ({
    type: UPDATE_ROW,
    updates
})

export const prepareRow = (newRow: any): IPrepareRowAction => ({
    type: PREPARE_ROW,
    newRow,
})

export const deleteRowAC = (rID: number, changed: any): IDeleteRowAction => ({
    type: DELETE_ROW,
    rID,
    changed
})

export const setDisableRows = (bol: boolean): IDisableRowsAction => ({
    type: DISABLE_ROWS,
    bol
})

export const updateRow = (eID: string, rID: number, updateBody: UpdateRowScheme) => async (dispatch: any) => {
    const response = await OUTLAY_API.updateRow(eID, rID, updateBody)

    dispatch(updateRowAC(response))
}

export const createRowInEntity = (eID: string, rowBody: IRowScheme) => async (dispatch: any) => {
    const response = await OUTLAY_API.createRowInEntity(eID, rowBody)

    dispatch(updateAfterCreation(response, rowBody.parentId))
}

export const getTreeRows = (eID: string) => async (dispatch: any) => {
    const treeRows = await OUTLAY_API.getTreeRows(eID)

    dispatch(setTreeRows(treeRows))
}

export const deleteRow = (eID: string, rID: number) => async (dispatch: any) => {
    const {changed} = await OUTLAY_API.deleteRow(eID, rID)
    
    dispatch(deleteRowAC(rID, changed))
}