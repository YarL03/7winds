import { DELETE_ROW, DISABLE_ROWS, PREPARE_ROW, SET_TREE_ROWS, UPDATE_ROW } from "../constants/Works";

export interface ISetTreeRowsAction {
    type: typeof SET_TREE_ROWS
    treeRows: any
}

export interface IUpdateAfterCreation extends IUpdateRowAction {
    parentId: null | number
}

export interface IUpdateRowAction {
    type: typeof UPDATE_ROW
    updates: any
}

export interface IPrepareRowAction {
    type: typeof PREPARE_ROW
    newRow: any
}

export interface IDeleteRowAction {
    type: typeof DELETE_ROW
    rID: number
    changed: any
}

export interface IDisableRowsAction {
    type: typeof DISABLE_ROWS
    bol: boolean
}
