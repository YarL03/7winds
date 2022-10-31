export interface IRow {
    equipmentCosts: number
    estimatedProfit: number
    id: number
    machineOperatorSalary: number
    mainCosts: number
    materials: number
    mimExploitation: number
    overheads: number
    rowName: string
    salary: number
    supportCosts: number
    total: number
}

export interface IRowScheme {
    equipmentCosts: number
    estimatedProfit: number
    machineOperatorSalary: number
    mainCosts: number
    materials: number
    mimExploitation: number
    overheads: number
    parentId: number | null
    rowName: string
    salary: number
    supportCosts: number
}

export type UpdateRowScheme = Omit<IRowScheme, 'parentId'>   