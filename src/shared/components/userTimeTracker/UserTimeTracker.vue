<template>
    <div class="user-bar">
        <button class="btn-raised-primary" @click="onClockIn">Entrar</button>
        <button class="btn-raised-accent" @click="onClockOut">Salir</button>
    </div>
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
            workStatus: null,
        }
    },
    name: 'UserTimeTracker',
    methods: {
        async getWorkStatusFromApi({ userId }) {
            this.workStatus = await getWorkStatus({ userId });
            console.log(this.workStatus);
        },
        async onClockIn() {
            this.workStatus = await addWorkEntryIn({ location: this.location, currentWorkStatus: this.workStatus });
            console.log(this.workStatus);
        },
        async onClockOut() {
            this.workStatus = await addWorkEntryOut({ location: this.location, currentWorkStatus: this.workStatus });
            console.log(this.workStatus);
        },
    },
    mounted() {
        this.getWorkStatusFromApi({ userId: this.userId });
    }
}
</script>

<style lang="scss" scoped>
    @import './UserTimeTracker.scss';
</style>