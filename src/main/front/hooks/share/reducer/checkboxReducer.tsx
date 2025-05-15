
export type checkedType ={
 [id:string]:boolean
}

export const checkboxReducer = (state, action)=>{
    switch(action.type){
        case 'UPDATE_CHECKED_ITEMS' :
            if(state[action.payload]){
                const { [action.payload]: removedItem, ...remainItems} = {...state};
                return {...remainItems}
            }else{
                return {...state, [action.payload]: true}
            }
        case 'TOGGLE_ALL_CHECKED_ITEMS' :
            return {...action.payload}
        default : return state;
    }
}