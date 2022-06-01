<template>
  <div class="user-menu">
    <div class="profile-picture-wrapper" :class="{ online: workStatus === 'online', offline: workStatus === 'offline' }">
        <img class="profile-picture" :src="user.imageProfileUrl" />
    </div>
    <span class="name">{{ user.firstName }} {{ user.lastName }}</span>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // User would come from auth service or user store
            user: {
                firstName: 'Juanjo',
                id: '00371793-00ff-4ad9-86cc-41bf35b87ed0',
                imageProfileUrl: 'https://sdmedia.los40.com.mx/los40mexico/imagenes/201910/21/20191021221620_1571689976_still.jpg',
                lastName: 'Calderón'
            }
        }
    },
    name: 'UserMenu',
    props: {
        workStatus: {
            type: String,
            required: false,
        }
    },
}
</script>

<style lang="scss" scoped>
    @import './UserMenu.scss';
</style>