<template>
    <div class="user-bar">
        <button v-if="workStatus === 'offline'" class="btn-raised-primary" @click="onClockIn">Entrar</button>
        <div v-else>
            <button class="btn-raised" @click="onClockPause">Pausa</button>
            <button class="btn-raised-accent" @click="onClockOut">Salir</button>
        </div>
    </div>
    <pre>
        {{ workStatus }}
    </pre>
</template>

<script>
import { addWorkEntryIn, addWorkEntryOut, getWorkStatus } from "@/core/services/work-entries.service";

export default {
    data() {
        return {
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
    },
    mounted() {
        this.getWorkStatusFromApi({ userId: this.userId });
    },
    watch: {
        userWorkInfo(value, oldValue) {
            if (!value) return;
            this.workStatus = value.employee.workStatus;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './UserTimeTracker.scss';
</style>