<template>
  <div class="user-menu">
    <div class="profile-picture-wrapper" :class="{ online: workStatus === 'online', offline: workStatus === 'offline' }">
        <img class="profile-picture" :src="user.imageProfileUrl" />
    </div>
    <ul class="nav">
        <li class="menu-item">
            <a href="">{{ user.firstName }} {{ user.lastName }}</a>
            <ul class="submenu">
                <li>
                    <a href="">Mis cuentas</a>
                    <ul class="submenu">
                        <li><a href="">Sesame 1</a></li>
                        <li><a href="">Sesame 2</a></li>
                    </ul>
                </li>
                <li><a href="">Vista empleado</a></li>
                <li><a href="">Mi perfil</a></li>
                <li><a href="">Cerrar Sesión</a></li>
		    </ul>
        </li>
    </ul>
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