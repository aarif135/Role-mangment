const INITIAL_STATE={
    data:[]
 
}
const userReducer=(INITIAL_STATE,action)=>{
    console.log("reducer--->",action.data)
    switch(action.type){
        case "USER_DATA":
            return{...INITIAL_STATE,data:action.data}
            default:{
                {}
            }
    }



}
export default userReducer