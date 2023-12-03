<template>
    <div class="users">
        <template v-if="paginatedData.length > 0">
            <div class="users-grid block-margin">
                <div class="users-item" v-for="user in paginatedData">
                    <div class="users-item__top">
                        <img :src="user.picture.thumbnail"
                             :alt="user.name.title + ' ' + user.name.first + ' ' + user.name.last">
                        <div class="users-item__name">
                            {{user.name.title}} {{user.name.first}} {{user.name.last}}
                        </div>
                    </div>
                    <div class="users-item__line">
                        <span>Birthday:</span>
                        <span>{{formattedDate(user.dob.date)}}, age {{user.dob.age}}</span>
                    </div>
                    <div class="users-item__line">
                        <span>Email:</span>
                        <span><a :href="'mailto:'+user.email">{{user.email}}</a></span>
                    </div>
                    <div class="users-item__line">
                        <span>Phone:</span>
                        <span><a :href="'tel:'+user.phone">{{user.phone}}</a></span>
                    </div>
                    <div class="users-item__line">
                        <span>Location:</span>
                        <span>
                            {{user.location.country}}, {{user.location.city}}
                        </span>
                    </div>
                    <div class="users-item__line">
                        <span>Nationality:</span>
                        <span>{{user.nat}}</span>
                    </div>
                </div>
            </div>
            <div class="users-nav flex">
                <button class="btn" @click="prevPage" :disabled="pageNum === 0">Previous page</button>
                <button class="btn" @click="nextPage" :disabled="pageNum === pageCount - 1">Next Page</button>
            </div>
        </template>
        <template v-else>
            Data not found. Try another request.
        </template>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "UsersGrid",
        data() {
            return {
                pageNum: 1
            }
        },
        computed: {
            ...mapGetters(['allUsers']),
            pageCount() {
                return this.allUsers.length / 10
            },
            paginatedData() {
                return this.allUsers.slice(this.pageNum * 10, this.pageNum * 10 + 10);
            }
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
.users-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

.users-item {
    padding: 20px;
    border: 1px solid #000;
    border-radius: 10px;
}

.users-item__top {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
}

.users-item__top img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.users-item__name {
    width: calc(100% - 40px - 20px);
}
.users-item__line {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.users-item__line:not(:last-of-type) {
    margin-bottom: 10px;
}

.users-item__line span:first-of-type {
    opacity: 0.7;
}
.users-nav {
    justify-content: center;
}
</style>