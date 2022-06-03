<template>
    <div class="user-tracker-bar">
        <span class="time">{{ formatedWorkingTime }}</span>
        <button v-if="workStatus === 'offline'" class="btn-raised-primary" @click="onClockIn">Entrar</button>
        <div v-if="workStatus === 'online' || workStatus === 'paused'">
            <button class="btn-raised" @click="onClockPause">{{ pauseButtonText }}</button>
            <button class="btn-raised-accent" @click="onClockOut">Salir</button>
        </div>
        <span class="separator">|</span>
        <UserMenu :workStatus="workStatus"  />
    </div>
</template>

<script>
import { addWorkEntryIn, addWorkEntryOut, getWorkStatus } from "@/core/services/work-entries.service";
import UserMenu from '@/shared/components/UserMenu/UserMenu.vue';
import DateUtils from '@/shared/utils/dateUtils';

export default {
    components: { UserMenu },
    computed: {
        formatedWorkingTime() {
            return DateUtils.getFormatedTime({ timeNumber: this.workingTime });
        },
        pauseButtonText() {
            return this.workStatus === 'online' ? 'Pausa' : 'Continuar';
        }
    },
    data() {
        return {
            location: {
                latitude:  39.77,
                longitude: -0.40
            },
            stopWatch: undefined,
            // userId would come from auth service
            userId: '00371793-00ff-4ad9-86cc-41bf35b87ed0',
            userWorkInfo: null,
            workStatus: null,
            // Time in miliseconds
            workingTime: 0  
        }
    },
    name: 'UserTimeTracker',
    methods: {
        async getWorkStatusFromApi({ userId }) {
            this.userWorkInfo = await getWorkStatus({ userId });
            this.initWorkingTime();
        },
        async onClockIn() {
            this.userWorkInfo = await addWorkEntryIn({ location: this.location, currentWorkInfo: this.userWorkInfo });
            this.resetTime();
        },
        async onClockOut() {
            clearInterval(this.stopWatch);
            this.stopWatch = undefined;
            this.userWorkInfo = await addWorkEntryOut({ location: this.location, currentWorkInfo: this.userWorkInfo });
        },
        async onClockPause() {
            clearInterval(this.stopWatch);
            this.stopWatch = undefined;
            this.workStatus = 'paused';
            // Todo: Add request to pause session to api
        },
        initWorkingTime() {
            this.workStatus = this.userWorkInfo.employee.workStatus;
            if (this.workStatus === 'online') {
                let currentDate = new Date();
                const { workEntryIn } = this.userWorkInfo;
                // Todo: api do not give a realistic workEntryIn date for calculate the working time when workStatus is online
                // this.workingTime = DateUtils.getTimeDifference({ date1: currentDate, date2: workEntryIn.date });
            }
        },
        calculateTime() {
            if (this.workStatus == 'online') {
                this.startStopwatch();
            }
            if (this.workStatus == 'offline') {
                const { workEntryIn, workEntryOut } = this.userWorkInfo;
                this.workingTime = DateUtils.getTimeDifference({ date1: workEntryOut.date, date2: workEntryIn.date });
            }
        },
        startStopwatch() {
            this.stopWatch = setInterval(() => {
                this.workingTime += 1000;
            }, 1000)
        },
        resetTime() {
            this.workingTime = 0;
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