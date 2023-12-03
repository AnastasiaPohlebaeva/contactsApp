<template>
    <div class="login">
        <h1>Please choose type of user and log in</h1>
        <form @submit.prevent="loginUser">
            <div class="login-wrap">
                <label class="login-item">
                    <input type="radio"
                           name="user-type"
                           value="user"
                           v-model="userType">
                    <span>User</span>
                </label>
                <label class="login-item">
                    <input type="radio"
                           name="user-type"
                           value="admin"
                           v-model="userType">
                    <span>Admin</span>
                </label>
            </div>
            <button class="btn"
                    type="submit">
                Submit
            </button>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Login",
        data() {
            return {
                userType: ''
            }
        },
        methods: {
            ...mapActions(['login']),
            loginUser() {
                this.$store.dispatch('login', this.userType)
                    .then(() => this.$router.push('/'))
            }
        }
    }
</script>

<style scoped>
    .login {
        max-width: 500px;
        margin: 0 auto;
    }

    .login h1 {
        margin-bottom: 30px;
    }

    .login-wrap {
        display: flex;
        align-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    .login-item {
        display: flex;
        align-content: center;
        gap: 10px
    }
</style>