import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:3001/user/signup', {
      name: newUser.name,
      gender:newUser.gender,
      address:newUser.address,
      phoneNo:newUser.phoneNo,
      emailId: newUser.emailId,
      password: newUser.password,
      userType:newUser.userType
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = (user) => {
  return {
    type:'Login',
    user
  }
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}