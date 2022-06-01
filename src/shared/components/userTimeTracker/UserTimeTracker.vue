<template>
    <div class="user-bar">
        <button class="btn-raised-primary">Entrar</button>
        <button class="btn-raised-accent">Salir</button>
    </div>
</template>

<script>
import { getWorkStatus } from "@/core/services/work-entries.service";

export default {
    data() {
        return {
            // userId would come from auth service
            userId: '00371793-00ff-4ad9-86cc-41bf35b87ed0',
            workStatus: '',
        }
    },
    name: 'UserTimeTracker',
    methods: {
        async getWorkStatusFromApi({ userId }) {
            const workStatus = await getWorkStatus({ userId });
            console.log(workStatus);
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