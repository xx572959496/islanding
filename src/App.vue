<script setup>
import {ref} from "vue";
import Lessons from "./components/Lessons.vue";
import Recommends from "./components/Recommends.vue";
import UserPage from "./components/UserPage.vue";

const active = ref(1)

// onMounted( () => {
//   StyleProvider(Themes.md3Light)
// })
</script>

<template>
  <div class="main-page">
    <keep-alive>
      <lessons v-if="active === 1"/>
    </keep-alive>
    <Recommends v-if="active === 0"/>
    <UserPage v-if="active === 2" />
  </div>
  <var-bottom-navigation safe-area fixed v-model:active="active">
    <var-bottom-navigation-item label="探索" icon="chat-processing-outline" />
    <var-bottom-navigation-item label="首页" icon="home" />
    <var-bottom-navigation-item label="我的" icon="heart" />
  </var-bottom-navigation>
</template>

<style scoped>
.main-page {
  padding-bottom: var(--bottom-navigation-height);
}
</style>
