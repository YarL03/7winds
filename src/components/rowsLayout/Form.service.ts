export function validateData(data: any) {
    return Object.entries(data).reduce((prev: any, curr: any) => {
        if (curr[1] !== undefined)
            prev[curr[0]] = curr[1]
        
        return prev
    }, {})
}