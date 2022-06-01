<template>
    <div class="user-tracker-bar">
        <span class="time">{{ formatedTime }}</span>
        <button v-if="workStatus === 'offline'" class="btn-raised-primary" @click="onClockIn">Entrar</button>
        <div v-if="workStatus === 'online'">
            <button class="btn-raised" @click="onClockPause">Pausa</button>
            <button class="btn-raised-accent" @click="onClockOut">Salir</button>
        </div>
        <span class="separator">|</span>
        <UserMenu :workStatus="workStatus"  />
    </div>
    <pre>
        {{ workStatus }}
    </pre>
</template>

<script>
import { addWorkEntryIn, addWorkEntryOut, getWorkStatus } from "@/core/services/work-entries.service";
import UserMenu from '@/shared/components/UserMenu/UserMenu.vue';
import DateUtils from '@/shared/utils/dateUtils';

export default {
    components: { UserMenu },
    data() {
        return {
            formatedTime: '00:00:00',
            location: {
                latitude:  39.77,
                longitude: -0.40
            },
            // userId would come from auth service
            userId: '00371793-00ff-4ad9-86cc-41bf35b87ed0',
            userWorkInfo: null,
            workStatus: null,
        }
    },
    name: 'UserTimeTracker',
    methods: {
        async getWorkStatusFromApi({ userId }) {
            this.userWorkInfo = await getWorkStatus({ userId });
        },
        async onClockIn() {
            this.userWorkInfo = await addWorkEntryIn({ location: this.location, currentWorkInfo: this.userWorkInfo });
        },
        async onClockOut() {
            this.userWorkInfo = await addWorkEntryOut({ location: this.location, currentWorkInfo: this.userWorkInfo });
        },
        async onClockPause() {
            // Todo Stuff
        },
        calculateTime() {
            if (this.workStatus == 'online') {
                console.log('online');
            }
            if (this.workStatus == 'offline') {
                const { workEntryIn, workEntryOut } = this.userWorkInfo;
                const differenceTime = DateUtils.getTimeDifference({ date1: workEntryOut.date, date2: workEntryIn.date });
                this.formatedTime = DateUtils.getFormatedTime({ timeNumber: differenceTime });
            }
        }
    },
    mounted() {
        this.getWorkStatusFromApi({ userId: this.userId });
    },
    watch: {
        userWorkInfo(value, oldValue) {
            if (!value) return;
            this.workStatus = value.employee.workStatus;
            this.calculateTime();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './UserTimeTracker.scss';
</style>