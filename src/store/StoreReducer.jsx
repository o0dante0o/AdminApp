const types = {
    IPInfo : 'SET_GEO'
}

const initialStore = {
    geo : {}
}
const StoreReducer  = (state = initialStore, action) => { 
    switch(action.type){
        case types.IPInfo:
            return {
                ...state,
                geo: action.payload
            }
        default:
            return state;  
    }
}

export { initialStore,types }
export default StoreReducer;