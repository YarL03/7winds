import { SET_TREE_ROWS, UPDATE_ROW, DELETE_ROW, SET_FORM_REF, PREPARE_ROW, DISABLE_ROWS } from '../constants/Works'


interface IState {
    eID: string
    treeRows: Array<any>,
    formRef: any,
    disableRows: boolean
}

const initialState: IState = {
    formRef: null,
    treeRows: [],
    eID: '2441',
    disableRows: false
}

const worksReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DISABLE_ROWS:
            return {...state, disableRows: action.bol}

        case SET_FORM_REF:
            return {...state, formRef: action.formRef}

        case SET_TREE_ROWS: 
            return {...state, treeRows: action.treeRows}

        case UPDATE_ROW: {
            const {current, changed} = action.updates

            if (action.parentId !== undefined)
                return action.parentId === null
                    ? {...state, treeRows: [
                        ...state.treeRows.slice(0, state.treeRows.length - 1),
                        {...current, child: []}
                ]} 
                    : {
                    ...state,
                    treeRows: state.treeRows.reduce((prev: any, root: any) => {

                        if (changed.length === 1) 
                            prev.push(root.id === action.parentId ? {
                                ...root,
                                ...changed[0],
                                child: [...root.child.slice(0, root.child.length - 1), {...current, child: []}]
                            }
                            : {
                                ...root,
                                child: root.child.length > 0
                                ? root.child.reduce((prev: any, subRoot: any) => {
                                        prev.push(subRoot.id === action.parentId ? {
                                            ...subRoot,
                                            child: [...subRoot.child.slice(0, subRoot.child.length - 1), {...current, child: []}]
                                            }
                                            : subRoot)
                                        return prev
                                    }, [])
                                : []
                            } )

                        else if (changed.length === 2)
                            prev.push(root.id === action.parentId ? {
                                ...root,
                                ...changed[0],
                                child: [...root.child.slice(0, root.child.length - 1), {...current, child: []}]
                            }
                            : {
                                ...root,
                                ...changed[1],
                                child: root.child.length > 0
                                ? root.child.reduce((prev: any, subRoot: any) => {
                                        prev.push(subRoot.id === action.parentId ? {
                                            ...subRoot,
                                            child: [...subRoot.child.slice(0, subRoot.child.length - 1), {...current, child: []}]
                                            }
                                            : subRoot)
                                        return prev
                                    }, [])
                                : []
                            } )

                        else
                            prev.push(root.id === action.parentId ? {
                            ...root,
                            child: [...root.child.slice(0, root.child.length - 1), {...current, child: []}]
                        }
                        : {
                            ...root,
                            child: root.child.length > 0
                            ? root.child.reduce((prev: any, subRoot: any) => {
                                    prev.push(subRoot.id === action.parentId ? {
                                        ...subRoot,
                                        child: [...subRoot.child.slice(0, subRoot.child.length - 1), {...current, child: []}]
                                        }
                                        : subRoot)
                                    return prev
                                }, [])
                            : []
                        } )
                           
                        return prev
                    }, [])
                }
            
            else if (changed.length === 1) 
                return {
                    ...state,
                    treeRows: state?.treeRows.map((root: any) => root.id === changed[0].id
                        ? {...root, ...changed[0], child: root.child.map((target: any) => target.id === current.id
                            ? {...target, ...current}
                            : target)}
                        : root)
                }

            else if(changed.length === 2) 
                return {
                    ...state,
                    treeRows: state.treeRows.map((root: any) => root.id === changed[1].id 
                        ? {...root, ...changed[1], child: root.child.map((subRoot: any) => subRoot.id === changed[0].id
                            ? {...subRoot, ...changed[0], child: subRoot.child.map((target: any) => 
                               target.id === current.id
                                    ? {...target, ...current}
                                    : target)}
                            : subRoot)}
                        : {
                            ...root,
                            child: root.child.map((subRoot: any) => subRoot.id === changed[0].id
                            ? {...subRoot, ...changed[0], child: subRoot.child.map((target: any) => 
                               target.id === current.id
                                    ? {...target, ...current}
                                    : target)}
                            : subRoot)
                        })
                }
            
            else {
                return {
                    ...state,
                    treeRows: state.treeRows.map((item: any) => 
                            item.id === current.id ? {
                                ...item,
                                ...current
                                }
                            : item)
                }
            }
        }

        case PREPARE_ROW:
            return {
                ...state,
                treeRows: action.newRow.parentId 
                    ? state.treeRows.reduce((prev: any, root: any) => {
                        if (action.newRow.parentId === root.id) 
                            prev.push({
                                    ...root,
                                    child: [...root.child, {...action.newRow, child:[]}]
                                })
                        else
                            prev.push({
                                ...root,
                                child: root.child.reduce((prev: any, subRoot: any) => {
                                    if (action.newRow.parentId === subRoot.id)
                                        prev.push({
                                            ...subRoot,
                                            child: [...subRoot.child, {...action.newRow, child:[]}]
                                        })
                                    else
                                        prev.push({
                                            ...subRoot
                                        })
                                    return prev
                                }, [])
                            })
                            return prev
                    }, [])
                    : [...state.treeRows, {...action.newRow, child:[]}]
            }

        case DELETE_ROW: {
            if (action.changed.length === 1)
                return {
                    ...state,
                    treeRows: state.treeRows.reduce((prev: any, root: any) => {
                        if (root.id !== action.rID)
                            prev.push(root.id === action.changed[0].id ? {
                                ...root,
                                ...action.changed[0],
                                child: root.child.length > 0
                                ? root.child.reduce((prev: any, subRoot: any) => {
                                    if (subRoot.id !== action.rID)
                                        prev.push(subRoot.id === action.changed[1].id ? {
                                            ...subRoot,
                                            ...action.changed[1],
                                            child: subRoot.child.length > 0
                                            ? subRoot.child.reduce((prev: any, target: any) => {
                                                if (target.id !== action.rID)
                                                    prev.push({
                                                        ...target
                                                    })
                                                return prev
                                                    }, [])
                                                : []
                                            }
                                            : {
                                                ...subRoot,
                                                child: subRoot.child.length > 0
                                                ? subRoot.child.reduce((prev: any, target: any) => {
                                                    if (target.id !== action.rID)
                                                        prev.push({
                                                            ...target
                                                        })
                                                    return prev
                                                        }, [])
                                                    : []
                                                })
                                        return prev
                                    }, [])
                                : []
                            }
                            : {
                                ...root,
                                child: root.child.length > 0
                                ? root.child.reduce((prev: any, subRoot: any) => {
                                    if (subRoot.id !== action.rID)
                                        prev.push({
                                            ...subRoot, 
                                            child: subRoot.child.length > 0
                                            ? subRoot.child.reduce((prev: any, target: any) => {
                                                if (target.id !== action.rID)
                                                    prev.push({
                                                        ...target
                                                    })
                                                return prev
                                                    }, [])
                                                : []
                                            })
                                        return prev
                                    }, [])
                                : []
                            })
                        
                        
                        
                        return prev
                    }, [])
                }
            else if (action.changed.length === 2)
            return {
                ...state,
                treeRows: state.treeRows.reduce((prev: any, root: any) => {
                    if (root.id !== action.rID)
                        prev.push(root.id === action.changed[1] ? {
                            ...root,
                            ...action.changed[1],
                            child: root.child.length > 0
                            ? root.child.reduce((prev: any, subRoot: any) => {
                                if (subRoot.id !== action.rID)
                                    prev.push(subRoot.id === action.changed[0].id ? {
                                        ...subRoot,
                                        ...action.changed[0], 
                                        child: subRoot.child.length > 0
                                        ? subRoot.child.reduce((prev: any, target: any) => {
                                            if (target.id !== action.rID)
                                                prev.push({
                                                    ...target
                                                })
                                            return prev
                                                }, [])
                                            : []
                                        }
                                        : {
                                            ...subRoot,
                                            child: subRoot.child.length > 0
                                            ? subRoot.child.reduce((prev: any, target: any) => {
                                                if (target.id !== action.rID)
                                                    prev.push({
                                                        ...target
                                                    })
                                                return prev
                                                    }, [])
                                                : []  
                                        })
                                    return prev
                                }, [])
                            : []
                        }
                        : {
                            ...root,
                            child: root.child.length > 0
                            ? root.child.reduce((prev: any, subRoot: any) => {
                                if (subRoot.id !== action.rID)
                                prev.push(subRoot.id === action.changed[0].id ? {
                                    ...subRoot,
                                    ...action.changed[0], 
                                    child: subRoot.child.length > 0
                                    ? subRoot.child.reduce((prev: any, target: any) => {
                                        if (target.id !== action.rID)
                                            prev.push({
                                                ...target
                                            })
                                        return prev
                                            }, [])
                                        : []
                                    }
                                    : {
                                        ...subRoot,
                                        child: subRoot.child.length > 0
                                        ? subRoot.child.reduce((prev: any, target: any) => {
                                            if (target.id !== action.rID)
                                                prev.push({
                                                    ...target
                                                })
                                            return prev
                                                }, [])
                                            : []  
                                    })
                                    return prev
                                }, [])
                            : []
                        })
                    return prev
                }, [])
            }
            else
            return {
                ...state,
                treeRows: state.treeRows.reduce((prev: any, root: any) => {
                    if (root.id !== action.rID)
                        prev.push({
                            ...root,
                            child: root.child.length > 0
                            ? root.child.reduce((prev: any, subRoot: any) => {
                                if (subRoot.id !== action.rID)
                                    prev.push({
                                        ...subRoot,
                                        child: subRoot.child.length > 0
                                        ? subRoot.child.reduce((prev: any, target: any) => {
                                            if (target.id !== action.rID)
                                                prev.push({
                                                    ...target
                                                })
                                            return prev
                                                }, [])
                                            : []
                                        }
                                        )
                                    return prev
                                }, [])
                            : []
                        }
                        )
                    
                    
                    
                    return prev
                }, [])
            } 
        }
            
        default:
            return state
    }
}

export default worksReducer