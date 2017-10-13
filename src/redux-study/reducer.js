import {combineReducers} from 'redux'
var todo = function (state, action) {
    let items;
    switch (action.type){
        case 'add':
            items = state.items
            items.push({name:action.text,active:true})
            return Object.assign({},state,{items:[...items]})

        case 'remove':
            items = state.items
            let json = []

            for(let i=0;i<items.length;i++){
                if(items[i].name !== action.text){
                    json.push(items[i])
                }
            }
            return Object.assign({},state,{items:json})
        case 'active':
            return Object.assign({},state,{active:action.value})
        case 'active-item':
            items = state.items;
            for(let i=0;i<items.length;i++){
                if(items[i].name === action.text){
                    items[i].active = !items[i].active
                }
            }
            return Object.assign({},state,{items:[...items]})
        default:
            break
    }
    return {
        name:'todo-mvc',
        active:'all',
        items:[{name:'aaa',active:false},{name:'bbb',active:true}]
    }
}

var fs = function (state, action) {
    switch (action.type){

    }
    return {
        name:'fs',
        items:[{name:'ryan',folder:false,ext:'.txt'},{name:'ready',folder:true,ext:''}]
    }
}

//合并reducer

var reducer = combineReducers({
    todo,
    fs
})
export default reducer