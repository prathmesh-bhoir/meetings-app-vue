import { login } from "@/services/auth";
import getUsers from "@/services/utils/getUsers";

const KEY_NAME = 'name'
const KEY_EMAIL = 'email'
const KEY_TOKEN = 'token'
const KEY_USERS = 'users'

const auth = {
        state: {
            token: localStorage.getItem( KEY_TOKEN ) || '',
            email: localStorage.getItem( KEY_EMAIL ) || '',
            name: localStorage.getItem( KEY_NAME ) || '',
            allUsers: localStorage.getItem(KEY_USERS) || ''
        },
        getters: {
            userEmail: (state) => state.email,
            allUsers: (state) => state.allUsers
        },
        mutations: {
            setToken(state, token){
                state.token = token
            },
            setEmail(state, email){
                state.email = email
            },
            setName(state, name){
                state.name = name
            },
            setAllUsers(state, allUsers){
                state.allUsers = allUsers
            }
        },
        actions: {
            async login({commit}, userDetails){
                const data = await login(userDetails);

                const { token, email, name} = data;

                localStorage.setItem(KEY_TOKEN, token);
                localStorage.setItem(KEY_EMAIL, email);
                localStorage.setItem(KEY_NAME, name)

                commit('setToken', token);
                commit('setEmail', email);
                commit('setName', name);

                return email;
            },
            async getAllUsers({commit}){
                
                const usersList = []
                const response = await getUsers();

                response.data.forEach(user => {
                    usersList.push(user.email);
                })
                localStorage.setItem(KEY_USERS, usersList);

                commit('setAllUsers', usersList);

                return response;
            }
        }
}


export default auth;