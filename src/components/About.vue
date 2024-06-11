<template>
    <Header />
  
    <div class="w-full flex flex-col justify-center h-[90vh]">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-[80%] flex flex-row gap-10 justify-center items-center mt-5">
          <h1 class="font-bold font-poppins text-8xl text-black">ProgAlgo:</h1>
          <div class="border-4 border-[#023e8a] rounded-xl text-center p-3">
            <p class="font-light font-poppins text-xl tracking-wider text-black">
              where 
              <span class="text-[#023e8a] font-poppins font-bold text-2xl">First Come First</span>, 
              <span class="text-[#023e8a] font-poppins font-bold text-2xl">Shortest Process First</span>, 
              and 
              <span class="text-[#023e8a] font-poppins font-bold text-2xl">Round Robin</span> 
              Scheduling Algorithms Meet to Streamline Your Processes!
            </p>
          </div>
        </div>
  
        <div class="w-[80%] m-1 p-3">
          <p class="font-poppins tracking-wider p-3 leading-loose">
            <span class="text-[#023e8a] font-bold font-poppins">ProgAlgo</span> is your go-to destination for 
            <span class="text-black font-bold font-poppins">scheduling algorithm generation and calculation</span>. 
            Whether you're optimizing task scheduling or planning complex workflows, 
            <span class="text-[#023e8a] font-bold font-poppins">ProgAlgo</span> offers powerful tools to enhance your processes
            and <span class="text-black font-bold font-poppins">boost efficiency</span>. 
            With its <span class="text-black font-bold font-poppins">user-friendly interface</span> and 
            <span class="text-[#023e8a] font-bold font-poppins">robust features</span>, 
            <span class="text-[#023e8a] font-bold font-poppins">ProgAlgo</span> is your essential companion
            for tackling scheduling challenges with ease.
          </p>
        </div>
      </div>
  
      <div class="relative flex flex-col justify-center items-center">
        <h1 class="font-poppins font-bold text-2xl">Contributors:</h1>
        <div class="w-full flex flex-row justify-center gap-20 mt-8">
          <div v-for="(item, index) in contributors" :key="index" class="text-center">
            <div class="bg-[#023e8a] h-[170px] w-[170px] flex justify-center items-center rounded-2xl">
              <a :href="item.link" target="_blank">
                <img :src="item.picture" alt="" />
              </a>
            </div>
            <h1 class="font-poppins font-semibold p-3">{{ item.name }}</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  img {
    height: 150px;
    width: 150px;
    border-radius: 1rem;
    transition: all 0.3s ease;
  }
  img:hover {
    height: 170px;
    width: 170px;
  }
  </style>
  
  <script>
  import Header from './header.vue';
  
  export default {
    components: {
      Header,
    },
    data() {
      return {
        contributors: [
          { name: 'Kian Candelario', link: 'https://github.com/KianCandelario', picture: './src/assets/contributors/kian.jpg' },
          { name: 'Russel Custodio', link: 'https://github.com/cusrussel', picture: './src/assets/contributors/russel.jpg' },
          { name: 'Mel Zedric Faustino', link: 'https://github.com/MelZedricFaustino', picture: './src/assets/contributors/mel.jpg' },
          { name: 'Vincent Maiwat', link: 'https://github.com/VincentMaiwat', picture: './src/assets/contributors/vincent.jpg' },
        ],
      };
    },
  };
  </script>
  