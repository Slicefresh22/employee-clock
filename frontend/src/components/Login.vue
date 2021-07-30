<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        Please Login
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input class="form-control" v-model="username" type="text" name="username">
                                <label for="password">Password</label>
                                <input class="form-control" v-model="password" type="password" name="password">
                                <br>
                                <button class="form-control btn btn-dark" @click="login(username, password)">Login</button>
                                <br>
                                <button class="form-control btn btn-dark" @click="verify">Verify</button>
                                <br>
                                <button class="form-control btn btn-dark" @click="logout">Logout</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script>
import AuthService from '../services/AuthService'
import AppService from '../services/AppService';

export default {
    name: 'Login',
    data(){
        return {
            username: '',
            password:''
        }
    },

    methods: {
        login(username, password){
            AuthService.Login(username,password).then((res) => {
                const { data: token } = res;
                if(token){
                    AppService.writeLocalStorage('token', token);
                    AuthService.setAuthenticated(true);
                }else {
                    AppService.deleteLocalStorage('token');
                    AuthService.setAuthenticated(false);
                }
            })
        },

        logout(){
            // log out remove the token from storage
            AuthService.Logout();
        },

        verify(){
            const token = AppService.readLocalStorage("token");
            AuthService.VerifyJWT(token).then(res => {
                res ? console.log('Verified'): console.log('Verify Failed');
            })
        }
    }
}
</script>


<style scoped>
label{
    float: left;
}

.card {
    margin-top: 70px;
}
</style>