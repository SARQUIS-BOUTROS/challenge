const setList = items  => {
    let list = []
    items.forEach( i => {
        let orderRequest

        orderRequest = {
            subject: i.subject,
            body: i.body,
            date: i.date
        }
        list.push(orderRequest)
    })
    return {
        type: 'SET_LIST',
        list: list
    }
}
const addToList = order => {
        return {
            type: 'ADD_TO_LIST',
            order: order
        }
}

export {
    setList,
    addToList
};