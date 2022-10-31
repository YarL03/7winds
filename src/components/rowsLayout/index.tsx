import { useEffect, FC } from 'react'
import { Form } from "antd"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import style from './RowsLayout.module.scss'
import { createRowInEntity, getTreeRows, setFormRef, updateRow } from '../../redux/actions/Works'
import { useSelector } from 'react-redux'
import { selectEID } from '../../redux/selectors/Works'
import { ExtendedDispatch } from '../../shared/types/ExtendedDispatch.type'

const TableLayout: FC = () => {
    const eID = useSelector(selectEID) 
    const [form] = Form.useForm()
    const dispatch = useDispatch() as ExtendedDispatch

    const onFinish = (data: any) => {
        data.parentId === 'update'
        ? dispatch(updateRow(eID, data.rID, {
            rowName: data.rowName || 'string',
            salary: +data.salary || 0,
            equipmentCosts: +data.equipmentCosts || 0,
            overheads: +data.overheads || 0,
            estimatedProfit: +data.estimatedProfit || 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            supportCosts: 0
        }))
        : dispatch(createRowInEntity(eID, {
            rowName: data.rowName || 'string',
            salary: +data.salary || 0,
            equipmentCosts: +data.equipmentCosts || 0,
            overheads: +data.overheads || 0,
            estimatedProfit: +data.estimatedProfit || 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            parentId: data.parentId,
            supportCosts: 0
        }))
        form.resetFields()
    }

    useEffect(() => {
        dispatch(setFormRef(form))

        dispatch(getTreeRows(eID))
    }, [])

    return (
        <Form
            name="row"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >   
            <div className={style.banner}>
                <span >Строительно-монтажные работы</span>
            </div>
            <div className={style.tableConteainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Уровень</th>
                            <th>Наименование работ</th>
                            <th>Основная з/п</th>
                            <th>Оборудование</th>
                            <th>Накладные расходы</th>
                            <th>Сметная прибыль</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Outlet/>
                    </tbody>
                </table>
            </div>
        </Form>
    )
}

export default TableLayout