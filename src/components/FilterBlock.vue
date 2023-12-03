<template>
    <div class="filter">
        <label class="filter-item">
            <span>Fullname</span>
            <input type="text"
                   name="name"
                   v-model="name"
                   placeholder="Input name"
                   @input="filterByField('name')">
        </label>
        <label class="filter-item">
            <span>Select gender</span>
            <select name="gender"
                    v-model="gender"
                    @change="filterByField('gender')">
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </label>
        <label class="filter-item">
            <span>Nationality</span>
            <input type="text"
                   name="nationality"
                   v-model="nationality"
                   placeholder="Input nationality"
                   @input="filterByField('nationality')">
        </label>
        <button @click="clearFilter" class=btn>Clear Filter</button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "FilterBlock",
        data() {
            return {
                name: '',
                gender: 'all',
                nationality: '',
            }
        },
        methods: {
            ...mapMutations(['filterUsers']),
            filterByField(field) {
                this.$store.commit('filterUsers', {field: field, value: this[field]})
            },
            clearFilter() {
                this.name = ''
                this.gender = 'all'
                this.nationality = ''
                this.$store.commit('filterUsers', {field: 'name', value: this.name})
                this.$store.commit('filterUsers', {field: 'gender', value: this.gender})
                this.$store.commit('filterUsers', {field: 'nationality', value: this.nationality})
            }
        }
    }
</script>

<style scoped>
.filter {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px
}
.filter-item {
    display: flex;
    flex-direction: column;
}
.filter-item input {
    padding: 10px 10px;
}
.filter-item select {
    padding: 10px 10px;
}
</style>