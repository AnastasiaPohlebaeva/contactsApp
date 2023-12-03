import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        userType: localStorage.getItem('userType') || '',
        viewType: localStorage.getItem('viewType') || 'table',
        users: [],
        filteredUsers: null,
        filterName: '',
        filterGender: 'all',
        filterNationality: '',
        statistics: null
    },
    actions: {
        login({commit}, userType) {
            commit('login', userType);
        },
        logout({commit}) {
            commit('logout');
        },
        async fetchData(ctx) {
            const res = await fetch('https://randomuser.me/api/?results=200');
            const users = await res.json();
            ctx.commit('updateUsers', users.results);
            ctx.commit('updateStats', users.results);
        },
        changeView({commit}, viewType) {
            commit('changeView', viewType)
        },
    },
    mutations: {
        login(state, userType) {
            state.userType = userType;
            localStorage.setItem('userType', userType);
        },
        logout(state) {
            state.userType = '';
            localStorage.removeItem('userType');
            state.isLoggedIn = false;
        },
        updateUsers(state, users) {
            state.users = users;
        },
        updateStats(state, users) {
            state.statistics = {}
            state.statistics['count'] = users.length;
            state.statistics['groups'] = [];
            state.statistics['groups'].push({
                name: 'Male',
                count: users.filter(user => user.gender === 'male').length });
            state.statistics['groups'].push({
                name: 'Female',
                count: users.filter(user => user.gender === 'female').length });
            state.statistics['groups'].push({
                name: 'Undecided',
                count: state.statistics['count'] - state.statistics['groups'][0].count - state.statistics['groups'][1].count });
            state.statistics['largestGroup'] = state.statistics['groups'].sort((a, b) => b.count - a.count)[0]

            state.statistics['nationality'] = []
            users.forEach(user => {
                let foundEl = state.statistics['nationality'].find(nationality => nationality.title === user.nat)
                if (foundEl) {
                    foundEl.value++
                } else {
                    state.statistics['nationality'].push({title: user.nat, value: 1})
                }
            })
        },
        changeView(state, viewType) {
            state.viewType = viewType;
            localStorage.setItem('viewType', viewType);
        },
        filterUsers(state, data) {
            let users = state.users;
            if (data.field === 'name') {
                state.filterName = data.value.toLowerCase()
            } else if (data.field === 'gender') {
                state.filterGender = data.value.toLowerCase()
            } else if (data.field === 'nationality') {
                state.filterNationality = data.value.toLowerCase()
            }
            state.filteredUsers = users.filter(user => {
                let nameFlag = true;
                let genderFlag = true;
                let natFlag = true;
                if (state.filterName !== '') {
                    let fullName = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
                    nameFlag = fullName.toLowerCase().indexOf(state.filterName) > -1;
                }
                if (state.filterGender === 'all') {
                    genderFlag = true
                } else {
                    genderFlag = user.gender === state.filterGender.toString()
                }
                if (state.filterNationality !== '') {
                    natFlag = user.nat.toLowerCase().indexOf(state.filterNationality) > -1
                }
                return nameFlag && genderFlag && natFlag
            });
        }
    },
    getters: {
        isLoggedIn(state) {
            state.isLoggedIn = state.userType !== '';
            return state.isLoggedIn
        },
        isAdmin(state) {
            return state.userType === 'admin'
        },
        viewType(state) {
            return state.viewType
        },
        allUsers(state) {
            return state.users
        },
        filteredUsers(state) {
            return state.filteredUsers === null ? state.users : state.filteredUsers
        },
        statistics(state) {
            return state.statistics
        }
    }
})

export default store