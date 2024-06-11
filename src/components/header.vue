<template>
    <nav class = "bg-white shadow-md shadow-black-500/50 .. relative flex flex-row justify-between font-bold text-xl font-poppins w-full overflow-hidden">
    <div class = "static flex items-center ml-[150px] w-1/2">
      <img src="" alt="">
      <router-link  class = "font-poppins" to = "/"> ProgAlgo </router-link>
    </div>
    
    <ul class = " h-[10vh] relative flex flex-row gap-10 justify-center items-center text-[17px] ml-20 w-1/2">
      <li>
        <router-link active-class="text-[#023e8a]" class = "font-poppins hover:text-[#023e8a]" to = "/"> Algorithm Generator</router-link> </li>
        <li>
          <router-link  active-class="text-[#023e8a]" class= "font-poppins hover:text-[#023e8a]" to = "/about"> About</router-link> </li>
          <li>
            <a href="https://github.com/KianCandelario/ProgAlgo"><img src="/src/assets/gitblack.svg" alt=""></a>
          </li>
    </ul>
  </nav>
</template>

<script>
</script>