<template>
    <div>
        <Navbar></Navbar>
       <div class="dashboard-wrapper mt-4">
           <div class="card mr-3">
                <div class="card-body">
                    <h3> Welcome, {{ getCurrentUser.firstName }} </h3>
                </div>
            </div>
       </div>
    </div>
</template>

<script>

import Navbar from '../components/Navbar.vue';

export default {
    name: 'Dashboard',
    components: {
        Navbar
    },

    computed: {
        getCurrentUser(){
            return this.$store.getters.getCurrentUser
        }
    },

    mounted(){
        // set the current user 
        this.$store.dispatch('setCurrentUser');
    }
    
}
</script>