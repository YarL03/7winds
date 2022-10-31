import {FC} from 'react'
import { useSelector } from "react-redux"
import { selectTreeRows } from "../../redux/selectors/Works"
import { ITreeRow } from "../../shared/models/TreeRow.interface"
import { Row } from "./Row"

export const Rows: FC = () => {
    const treeRows = useSelector(selectTreeRows)
    
    const rows: Array<any> = []

    treeRows.forEach((root: ITreeRow) => {
        rows.push(<Row
            key={root.id}
            rowName={root.rowName}
            salary={root.salary}
            equipmentCosts={root.equipmentCosts}
            overheads={root.overheads}
            estimatedProfit={root.estimatedProfit}
            id={root.id}
            data-level={'1'}
            data-child={!!root.child.length}
            />)


        root.child.length && root.child.forEach((subRoot: ITreeRow, sIndex: number) => {
            rows.push(<Row
                key={subRoot.id}
                parentId={root.id}
                rowName={subRoot.rowName}
                salary={subRoot.salary}
                equipmentCosts={subRoot.equipmentCosts}
                overheads={subRoot.overheads}
                estimatedProfit={subRoot.estimatedProfit}
                id={subRoot.id}
                data-level={'2'}
                data-child={!!subRoot.child.length}
                data-last={root.child.length-1 === sIndex}
                />)


            subRoot.child.length && subRoot.child.forEach((target: ITreeRow, tIndex: number) => {
                rows.push(<Row
                    key={target.id}
                    parentId={subRoot.id}
                    rowName={target.rowName}
                    salary={target.salary}
                    equipmentCosts={target.equipmentCosts}
                    overheads={target.overheads}
                    estimatedProfit={target.estimatedProfit}
                    id={target.id}
                    data-level={'3'}
                    data-last={(root.child.length-1 === sIndex) && (subRoot.child.length-1 === tIndex)}
                    />)
            })
        })  
    })

    return (
        <>
            {treeRows.length ? rows : <div>Loading...</div>}
        </>
    )
}

