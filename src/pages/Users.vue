<template>
    <div class="container">
        <div class="block-margin flex flex--reverse">
            <button class="btn" @click="logout">Logout</button>
        </div>
        <div class="block-margin flex">
            <button @click="changeView" class="btn">Change view</button>
            <button @click="generateUsers" class="btn">Update Users</button>
        </div>
        <div class="block-margin" v-if="isAdmin">
            <FilterBlock />
        </div>
        <UsersGrid v-if="viewType === 'grid'"/>
        <UsersTable v-if="viewType === 'table'"/>
    </div>
</template>

<script>
    import UsersGrid from "../components/UsersGrid.vue";
    import UsersTable from "../components/UsersTable.vue";
    import FilterBlock from "../components/FilterBlock.vue";
    import {mapGetters, mapActions, mapMutations} from "vuex"

    export default {
        name: "Users",
        components: {
            UsersGrid,
            UsersTable,
            FilterBlock
        },
        computed: mapGetters(['viewType', 'isAdmin']),
        methods: {
            ...mapActions(['fetchData', 'changeView', 'logout']),
            ...mapMutations(['filterUsers']),
            changeView() {
                if (this.viewType === 'grid') {
                    this.$store.dispatch('changeView', 'table')
                } else {
                    this.$store.dispatch('changeView', 'grid')
                }
            },
            generateUsers() {
                this.fetchData();
            },
            logout() {
                this.$store.dispatch('logout').then(() => this.$router.push('/login'))
            },
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style scoped>

</style>