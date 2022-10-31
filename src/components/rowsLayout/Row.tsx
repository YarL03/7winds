import { FC, useState } from 'react'
import { Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { selectDisableRows, selectEID, selectFormRef } from '../../redux/selectors/Works'
import { FolderFilled, FileFilled, DeleteFilled } from '@ant-design/icons'
import style from './RowsLayout.module.scss'
import { useDispatch } from 'react-redux'
import { ExtendedDispatch } from '../../shared/types/ExtendedDispatch.type'
import { deleteRow, prepareRow, setDisableRows } from '../../redux/actions/Works'

interface T {
    rowName: string
    salary: number
    equipmentCosts: number
    overheads: number
    estimatedProfit: number
    [x: string]: any
}

export const Row: FC<T> = ({parentId, id, rowName, salary, equipmentCosts, overheads, estimatedProfit, ...props}) => {
    const [edit, setEdit] = useState(!rowName)
    const [showButtons, setShowButtons] = useState(false)

    const form = useSelector(selectFormRef)
    const eID = useSelector(selectEID)
    const disableRows = useSelector(selectDisableRows)

    const dispatch = useDispatch() as ExtendedDispatch


    const onMouseOver = () => !disableRows && !edit && setShowButtons(true)
    
    const onMouseLeave = () => setShowButtons(false)

    const onCreateRootFolder = () => dispatch(prepareRow({
            id: Date.now(),
            equipmentCosts: 0,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: null,
            rowName: '',
            salary: 0,
            supportCosts: 0
        }))

    const onCreateRow = () =>{ 
        dispatch(prepareRow({
        id: Date.now(),
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: id,
        rowName: '',
        salary: 0,
        supportCosts: 0
    }))}

    const onDelete = () => dispatch(deleteRow(eID, id))
    

    const img = props['data-level'] === '1' ? <FolderFilled onMouseOver={onMouseOver} style={{color: '#5F98F5'}}/>
        : props['data-level'] === '2' ? <FolderFilled onMouseOver={onMouseOver} style={{color: '#95FFAC'}}/>
        : <FileFilled onMouseOver={onMouseOver} style={{color: '#7890B2'}} />

    const onPressEnter = () => {
        setEdit(false)
        form.setFields([
            {
                name: 'parentId',
                value: rowName ? 'update'
                : props['data-level'] === '1'
                ? null : parentId
            },
            {
                name: 'rID',
                value: id
            },
            {
                name: 'rowName',
                value: form.getFieldValue('rowName') || rowName
            },
            {
                name: 'salary',
                value: form.getFieldValue('salary') || salary
            },
            {
                name: 'equipmentCosts',
                value: form.getFieldValue('equipmentCosts') || equipmentCosts
            },
            {
                name: 'overheads',
                value: form.getFieldValue('overheads') || overheads
            },
            {
                name: 'estimatedProfit',
                value: form.getFieldValue('estimatedProfit') || estimatedProfit
            },
    ])
        form.submit()
        dispatch(setDisableRows(false))
    }

    const allButtons = <div className={style.allButtons} onMouseLeave={onMouseLeave}>
       {
            props['data-level'] === '1' && 
            <FolderFilled onClick={onCreateRootFolder} className={style.icon}  style={{color: '#5F98F5'}}/>
        }
        {(props['data-level'] === '1' || props['data-level'] === '2') && 
            <FolderFilled onClick={onCreateRow} className={style.icon} style={{color: '#95FFAC'}}/>
        }
            {(props['data-level'] === '1' || props['data-level'] === '2') &&
                <FileFilled onClick={onCreateRow} className={style.icon} style={{color: '#7890B2'}} />
            }
            <DeleteFilled onClick={onDelete} className={style.icon} style={{color: '#DF4444'}} />
    </div>

    const onDoubleClick = () => {
        if (disableRows)
            return

        dispatch(setDisableRows(true))
        setEdit(true)
    }

    return (
        <>
            {!edit 
                ? <tr {...props} onDoubleClick={onDoubleClick}>
                <td className={style.connection}>
                    {!showButtons ? img : allButtons}
                </td>
                <td>{rowName}</td>
                <td>{salary}</td>
                <td>{equipmentCosts}</td>
                <td>{overheads}</td>
                <td>{estimatedProfit}</td>
                </tr>
                : <tr {...props}>
                    <td className={style.connection}>{img}</td>
                    <td>
                        <Form.Item
                        name='rowName'
                        >
                            <Input placeholder={`${rowName}`}  onPressEnter={onPressEnter}/>
                        </Form.Item>
                        <Form.Item name='parentId'/>
                        <Form.Item name='rID'/>
                    </td>
                    <td>
                        <Form.Item
                        name='salary'
                        >
                            <Input placeholder={`${salary}`} onPressEnter={onPressEnter}/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item
                        name='equipmentCosts'
                        >
                            <Input placeholder={`${equipmentCosts}`} onPressEnter={onPressEnter}/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item
                        name='overheads'
                        >
                            <Input placeholder={`${overheads}`} onPressEnter={onPressEnter}/>
                        </Form.Item>
                    </td>
                    <td>
                        <Form.Item
                        name='estimatedProfit'
                        >
                            <Input placeholder={`${estimatedProfit}`} onPressEnter={onPressEnter}/>
                        </Form.Item>
                    </td>
                </tr>
            }
        </>
    )
}