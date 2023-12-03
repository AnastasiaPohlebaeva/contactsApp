<template>
    <div>
        <template v-if="paginatedData.length > 0">
            <table class="users-table">
                <tr>
                    <th>Avatar</th>
                    <th class="users-table__name">Fullname</th>
                    <th>Birthday</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Nationality</th>
                </tr>
                <tr  v-for="user in paginatedData">
                    <td>
                        <img :src="user.picture.thumbnail"
                             :alt="user.name.title + ' ' + user.name.first + ' ' + user.name.last">
                    </td>
                    <td class="users-table__name">{{user.name.title}} {{user.name.first}} {{user.name.last}}</td>
                    <td class="users-table__birthday">{{formattedDate(user.dob.date)}}, age {{user.dob.age}}</td>
                    <td class="users-table__email"><a :href="'mailto:'+user.email">{{user.email}}</a></td>
                    <td class="users-table__phone"><a :href="'tel:'+user.phone">{{user.phone}}</a></td>
                    <td>
                        {{user.location.country}}, {{user.location.city}}
                    </td>
                    <td>{{user.nat}}</td>
                </tr>
            </table>
            <div class="users-nav flex" v-if="pageCount > 1">
                <button class="btn" @click="prevPage" :disabled="pageNum === 0">Previous page</button>
                <button class="btn" @click="nextPage" :disabled="pageNum > pageCount - 1">Next Page</button>
            </div>
            <div class="users-statistics" v-if="statistics">
                <div class="users-statistics__row">
                    <span>Users count:</span>
                    <span>{{statistics.count}}</span>
                </div>
                <div class="users-statistics__row" v-for="group in statistics.groups">
                    <span>{{group.name}} count:</span>
                    <span>{{group.count}}</span>
                </div>
                <div class="users-statistics__row">
                    <span>Largest group:</span>
                    <span>{{statistics.largestGroup.name.toLowerCase()}}</span>
                </div>
                <div class="users-statistics__row">
                    <span>Nationality:</span>
                    <span>
                        <span class="flex" v-for="nat in statistics.nationality">
                            <span>{{nat.title}}</span>
                            <span>{{nat.value}}</span>
                        </span>
                    </span>
                </div>
            </div>
        </template>
        <template v-else>
            Data not found. Try another request.
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "UsersTables",
        data() {
          return {
              pageNum: 0
          }
        },
        computed: {
            ...mapGetters(['filteredUsers', 'statistics']),
            pageCount() {
                return this.filteredUsers.length / 10
            },
            paginatedData() {
                return this.filteredUsers.slice(this.pageNum * 10, this.pageNum * 10 + 10);
            },
        },
        methods: {
            prevPage() {
                this.pageNum--
            },
            nextPage() {
                this.pageNum++
            },
            formattedDate(date) {
                let newDate = new Date(date);
                let day = newDate.getDate();
                let month = newDate.getMonth() + 1;
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = `0${month}`;
                }
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let dayOfWeek = daysOfWeek[newDate.getDay()];
                return dayOfWeek + ' ' + month + '/' + day + '/' + newDate.getFullYear() + ' ' + newDate.getHours() + ':' + newDate.getMinutes();
            }
        }
    }
</script>

<style scoped>
.users-table {
    width: 100%;
}
.users-table th {
    font-weight: 600;
}
.users-table th,
.users-table td {
    padding: 5px 10px;
}
.users-table th:first-of-type,
.users-table th:last-of-type,
.users-table td:first-of-type,
.users-table td:last-of-type {
    text-align: center;
}
.users-table th:not(:first-of-type):not(:last-of-type),
.users-table td:not(:first-of-type):not(:last-of-type) {
    text-align: left;
}
.users-table img {
    width: 40px;
    height: 40px;
}
.users-table__name {
    width: 20%;
}
.users-table__birthday {
    width: 20%;
}
.users-table__email {
    width: 25%;
}
.users-table__phone {
    width: 10%;
}
.users-nav {
    justify-content: center;
}
.users-statistics__row {
    display: flex;
    margin-bottom: 10px;
}
.users-statistics__row .flex span:first-of-type {
    width: 50px;
}
.users-statistics__row > span:first-of-type {
    width: 200px;
    opacity: 0.7;
}
</style>