import axios from 'axios'

export default {
    login(user){
        let promise= axios.get('/api/login', {params:user});
        console.log(promise);
        return promise
    }
}
