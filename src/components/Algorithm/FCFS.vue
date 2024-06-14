<template>
  <div class="content" id="app">
    <div class="flex flex-col w-1/4 relative justify-center gap-5 shadow-2xl shadow-black-500/50 rounded-xl h-[50vh] p-5">
      <h1 class="font-bold font-poppins text-[25px]">Input</h1>
      <form @submit.prevent="calculateFCFS">
        <label class="font-poppins">
          Arrival Time:
          <input class="font-poppins font-semibold text-[15px] p-3 tracking-wider border-[#d3d3d3] hover:bg-[#f4f4f4]" v-model="arrivalInput" type="text" placeholder="e.g. 1 2 3 4" required />
        </label>
        <br />
        <label class="font-poppins">
          Burst Time:
          <input class="font-poppins font-semibold text-[15px] p-3 tracking-wider border-[#d3d3d3] hover:bg-[#f4f4f4]" v-model="burstInput" type="text" placeholder="e.g. 1 2 3 4" required />
        </label>
        <br />
        <button type="submit" class="font-poppins font-bold text-white bg-[#023e8a] border-2 border-white rounded-md w-1/2">Solve</button>
      </form>
    </div>

    <div class="bg-white flex flex-col w-full relative rounded-[20px] shadow-2xl shadow-black-500/50 p-10" v-if="results.length === 0">
      <h1 class="text-[30px] font-bold text-[#023e8a] font-poppins">First Come First Serve Scheduling Algorithm (FCFS)</h1>
      <p class="text-[20px] p-5 font-quicksand font-semibold">In the "First come first serve" scheduling algorithm, as the name suggests, the process which arrives first, gets executed first, or we can say that the process which requests the CPU first, gets the CPU allocated first.</p>
      <p class="text-[20px] text-[#808080] w-full text-center h-full flex justify-center items-center">-- Gantt chart and table will be shown here --</p>
    </div>

    <div class="flex flex-col w-3/4 relative justify-center gap-5 rounded-[20px] bg-white p-10 shadow-2xl shadow-black-500/50" v-if="results.length > 0">
      <div class="relative flex flex-row justify-between items-center">
        <h2 class="font-poppins font-bold text-[25px]">Results</h2>
        <h2 class="font-poppins border-[#023e8a] border-2 rounded-md p-2 text-[#023e8a] font-bold">FCFS</h2>
      </div>

      <div class="w-full">
        <div class="w-full">
          <h2 class="font-poppins text-[15px] font-semibold mb-3">Gantt Chart</h2>
          <div class="relative w-full h-[40px]">
            <div v-for="(bar, index) in ganttBars" :key="index" class="absolute h-[40px] bg-[#023e8a] text-black font-bold border- border-2 flex justify-between" :style="getBarStyle(bar, index)">
              <span class="gantt-bar-label">{{ bar.id }}</span>
              <span class="gantt-bar-start" v-if="index === 0">{{ bar.start }}</span>
              <span class="gantt-bar-end">{{ bar.end }}</span>
            </div>
          </div>
        </div>
      </div>

      <br>

      <h1 class="font-poppins text-[15px] font-semibold mb-[-10px]">Table</h1>
      <table>
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.id">
            <td>{{ result.id }}</td>
            <td>{{ result.arrivalTime }}</td>
            <td>{{ result.burstTime }}</td>
            <td>{{ result.waitingTime }}</td>
            <td>{{ result.turnaroundTime }}</td>
          </tr>
        </tbody>
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
          <td><span class="font-bold font-poppins">{{ totalWaitingTime }} / {{ numberOfProcesses }}</span></td>
          <td><span class="font-bold font-poppins">{{ totalTurnaroundTime }} / {{ numberOfProcesses }}</span></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Average</td>
          <td><span class="font-bold font-poppins">{{ averageWaitingTime.toFixed(2) }}</span></td>
          <td><span class="font-bold font-poppins">{{ averageTurnaroundTime.toFixed(2) }}</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'poppins', 'sans-serif';
  }
  .content {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    gap: 20px;
    padding: 30px;
  }
  .left {
    display: flex;
    width: 20%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
    background: white;
    box-shadow: 0px 10px 10px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    height: 50vh;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input {
    position: relative;
    width: 100%;
    height: 40px;
    font-size: 17px;
    padding: 5px;
    border-radius: 5px;
    border-style: none;
    border: 1px solid black;
  }
  button {
    padding: 5px;
    font-size: 15px;
  }
  .right {
    display: flex;
    width: 80%;
    position: relative;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    background: white;
    box-shadow: 0px 43px 85px 34px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 50px;
  }
  table {
    border-collapse: collapse;
    border: 1px solid black;
  }
  td,
  th {
    border: 1px solid #023e8a;
    text-align: center;
    font-family: 'Poppins', 'sans-serif';
  }
  .gantt {
    width: 50%;
  }
  .gantt-chart {
    position: relative;
    background: #f0f0f0;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
  }
  .gantt-bar {
    position: absolute;
    height: 40px;
    border: 1px solid #87b5ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .gantt-bar-label {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-align: center;
    font-size: 15px;
    font-family: 'Poppins', 'sans-serif';
  }
  .gantt-bar-start,
  .gantt-bar-end {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    color: white;
    position: absolute;
    bottom: -20px;
    height: 20px;
    font-size: 15px;
    font-family: 'Poppins', 'sans-serif';
    width: 10px;
  }
  .gantt-bar-start {
    left: -10px;
  }
  .gantt-bar-end {
    right: -10px;
  }
</style>

<script>
export default {
  data() {
    return {
      arrivalInput: '',
      burstInput: '',
      processes: [],
      results: [],
      averageWaitingTime: 0,
      averageTurnaroundTime: 0,
      totalWaitingTime: 0,
      totalTurnaroundTime: 0,
      numberOfProcesses: 0,
      ganttBars: [],
    };
  },
  computed: {
    isArrivalInputValid() {
      return this.arrivalInput.trim().split(/\s+/).every(value => /^\d+$/.test(value));
    },
    isBurstInputValid() {
      return this.burstInput.trim().split(/\s+/).every(value => /^\d+$/.test(value));
    },
  },
  methods: {
    calculateFCFS() {
      if (!this.isArrivalInputValid || !this.isBurstInputValid) {
        alert('Please enter only integers for arrival and burst times.');
        return;
      }

      const arrivalEntries = this.arrivalInput.trim().split(/\s+/).map(Number);
      const burstEntries = this.burstInput.trim().split(/\s+/).map(Number);

      if (arrivalEntries.length !== burstEntries.length) {
        alert('Please enter the same number of arrival and burst times.');
        return;
      }

      this.processes = arrivalEntries.map((arrivalTime, index) => ({
        id: String.fromCharCode(65 + index), // Convert index to alphabetical ID starting from 'A'
        burstTime: burstEntries[index],
        arrivalTime: arrivalTime,
      }));

      // Sort processes based on arrival time
      this.processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

      this.numberOfProcesses = this.processes.length;
      const burstTime = this.processes.map(p => p.burstTime);
      const arrivalTime = this.processes.map(p => p.arrivalTime);

      const waitingTime = this.calculateWaitingTimeFCFS(this.numberOfProcesses, burstTime, arrivalTime);
      const turnaroundTime = this.calculateTurnaroundTime(this.numberOfProcesses, burstTime, waitingTime);

      this.results = this.processes.map((process, index) => ({
        id: process.id,
        burstTime: process.burstTime,
        arrivalTime: process.arrivalTime,
        waitingTime: waitingTime[index],
        turnaroundTime: turnaroundTime[index],
      }));

      this.averageWaitingTime = this.calculateAverage(waitingTime);
      this.averageTurnaroundTime = this.calculateAverage(turnaroundTime);

      this.totalWaitingTime = waitingTime.reduce((acc, time) => acc + time, 0);
      this.totalTurnaroundTime = turnaroundTime.reduce((acc, time) => acc + time, 0);

      this.generateGanttChart();
    },
    calculateWaitingTimeFCFS(numberOfProcesses, burstTime, arrivalTime) {
      const waitingTime = Array(numberOfProcesses).fill(0);
      let currentTime = 0;

      for (let i = 0; i < numberOfProcesses; i++) {
        if (currentTime < arrivalTime[i]) {
          currentTime = arrivalTime[i];
        }
        waitingTime[i] = currentTime - arrivalTime[i];
        currentTime += burstTime[i];
      }

      return waitingTime;
    },
    calculateTurnaroundTime(numberOfProcesses, burstTime, waitingTime) {
      return burstTime.map((bt, index) => bt + waitingTime[index]);
    },
    calculateAverage(times) {
      const total = times.reduce((acc, time) => acc + time, 0);
      return total / times.length;
    },
    generateGanttChart() {
      this.ganttBars = [];
      let currentTime = 0;

      this.processes.forEach((process, index) => {
        if (currentTime < process.arrivalTime) {
          currentTime = process.arrivalTime;
        }
        const startTime = currentTime;
        currentTime += process.burstTime;
        this.ganttBars.push({
          id: process.id,
          start: startTime,
          end: currentTime,
        });
      });
    },
    getBarStyle(bar, index) {
      const barWidth = 50; 
      const barHeight = 40; 
      const marginLeft = 0; 

      const leftPosition = index * (barWidth + marginLeft);

      return {
        width: `${barWidth}px`,
        left: `${leftPosition}px`,
        height: `${barHeight}px`,
        position: 'absolute',
      };
    },
  },
};
</script>
