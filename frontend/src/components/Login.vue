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
                                <button class="form-control btn btn-dark" @click="login">{{ isLoading? 'Signing in...': 'Sign in' }} </button>
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
export default {
    name: 'Login',
    data(){
        return {
            username: '',
            password:'', 
            isLoading: false,
            timeoutId: 0
        }
    },

    computed: {
        isAuthenticated(){
            return this.$store.getters.getAuthStatus;
        }
    }, 

    methods: {
        login(){
            const data = {
                username: this.username,
                password: this.password
            }
            this.$store.dispatch('login',data);
            this.isLoading = true;
            this.timeoutId = setTimeout(() => {
                this.$router.push('dashboard')
            }, 2000)
        }
    },

    unmount(){
        // clear the timeout id
        clearTimeout(this.timeoutId);
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