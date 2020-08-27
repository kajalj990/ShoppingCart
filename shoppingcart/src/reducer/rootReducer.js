import axios from 'axios'
const initialState ={
  //  products:[],
    user:[]

}

const rootReducer = (state = initialState,action)=>{
    if(action === 'Login'){
       return  axios.post('http://localhost:3001/user/login', {
         emailId: state.user.emailId,
         password: state.user.password
       })
       .then(response => {
         localStorage.setItem('usertoken', response.data)
         return response.data
       })
       .catch(err => {
         console.log(err)
       })   
    }
    return state
    
    
}
export default rootReducer