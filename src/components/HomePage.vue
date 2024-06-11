<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="w-full text-center">
      <h1></h1>
      <p class="text-gray-400 font-poppins mb-[-10px] mt-5">-- scheduling algorithm --</p>
      <ul class="h-[8vh] flex flex-row gap-16 justify-center items-center text-[25px]">
        <li v-for="(item, index) in nav" :key="index">
          <router-link class="font-poppins border-blue-900" active-class="border-b-2 font-bold text-blue-900" :to="item.link">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="overflow-auto flex-1">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
export default {
  components: {
    Header
  },
  data() {
    return {
      nav: [
        { name: 'FCFS', link: '/FCFS' },
        { name: 'SJF', link: '/SJF' },
        { name: 'RR', link: '/RR' },
      ],
    }
  }
}
</script>

<style>
li {
  cursor: pointer;
}
</style>
