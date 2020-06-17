function userData(data){
    console.log("action==>",data)
    return{
        type:"USER_DATA",
        data
    }

}
export default userData