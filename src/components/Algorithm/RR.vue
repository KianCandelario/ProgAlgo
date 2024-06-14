<template>
  <div class="content" id="app">
    <div class="flex flex-col w-1/4 relative justify-center gap-5 shadow-2xl shadow-black-500/50 rounded-xl h-[60vh] p-5">
      <h1 class="font-bold font-poppins text-[25px]">Input</h1>
      <form @submit.prevent="calculateRR">
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
        <label class="font-poppins">
          Time Quantum:
          <input class="font-poppins font-semibold text-[15px] p-3 tracking-wider border-[#d3d3d3] hover:bg-[#f4f4f4]" v-model.number="timeQuantum" type="number" placeholder="2" required />
        </label>
        <br />
        <button type="submit" class="font-poppins font-bold text-white bg-[#023e8a] border-2 border-white rounded-md w-1/2">Solve</button>
      </form>
    </div>

    <div class="bg-white flex flex-col w-3/4 relative rounded-[20px] shadow-2xl shadow-black-500/50 p-10" v-if="results.length === 0">
      <h1 class="text-[30px] font-bold text-[#023e8a] font-poppins">Round Robin Scheduling Algorithm (RR)</h1>
      <p class="text-[20px] p-5 font-quicksand font-semibold">Round Robin(RR) scheduling algorithm is mainly designed for time-sharing systems. This algorithm is similar to FCFS scheduling, but in Round Robin(RR) scheduling, preemption is added which enables the system to switch between processes.</p>
      <p class="text-[20px] text-[#808080] w-full text-center h-full flex justify-center items-center">-- Gantt chart and table will be shown here --</p>
    </div>

    <div class="flex flex-col w-3/4 relative justify-center gap-5 rounded-[20px] bg-white p-10 shadow-2xl shadow-black-500/50" v-if="results.length > 0">
      <div class="relative flex flex-row justify-between items-center">
        <h2 class="font-poppins font-bold text-[25px]">Results</h2>
        <h2 class="font-poppins border-[#023e8a] border-2 rounded-md p-2 text-[#023e8a] font-bold">RR</h2>
      </div>

    <div class = "w-full">
      <div class="w-full bg-transparent">
        <h2 class="font-poppins text-[15px] font-semibold mb-3">Gantt Chart</h2>
        <div class="gantt-chart" style ="background-color: transparent;">
          <div class="gantt " :style="{ width: ganttWidth + 'px' }">
            <div
              v-for="(bar, index) in ganttBars"
              :key="index"
              class="absolute h-[40px] bg-[#023e8a] text-black font-bold border-white border-2 flex justify-between"
              :style="getBarStyle(bar, index)"
            >
              <span class="gantt-bar-label">{{ bar.id }}</span>
              <span class="gantt-bar-start" v-if="index === 0">{{ bar.start }}</span>
              <span class="gantt-bar-end">{{ bar.end }}</span>
            </div>
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

<script>
export default {
  data() {
    return {
      arrivalInput: '',
      burstInput: '',
      timeQuantum: 1,
      processes: [],
      results: [],
      averageWaitingTime: 0,
      averageTurnaroundTime: 0,
      totalWaitingTime: 0,
      totalTurnaroundTime: 0,
      numberOfProcesses: 0,
      ganttBars: [],
      ganttWidth: 1300,
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
    calculateRR() {
      if (!this.isArrivalInputValid || !this.isBurstInputValid) {
        alert('Please enter only integers for arrival and burst times.');
        return;
      }

      const arrivalEntries = this.arrivalInput.trim().split(/\s+/).map(Number);
      const burstEntries = this.burstInput.trim().split(/\s+/).map(Number);
      const timeQuantum = this.timeQuantum;

      if (arrivalEntries.length !== burstEntries.length) {
        alert('Please enter the same number of arrival and burst times.');
        return;
      }

      this.processes = arrivalEntries.map((arrivalTime, index) => ({
        id: String.fromCharCode(65 + index), // Convert to alphabetical order
        burstTime: burstEntries[index],
        arrivalTime: arrivalTime,
      }));

      const numberOfProcesses = this.processes.length;
      this.numberOfProcesses = numberOfProcesses;
      const burstTime = this.processes.map(p => p.burstTime);
      const arrivalTime = this.processes.map(p => p.arrivalTime);

      const { waitingTime, turnaroundTime, ganttBars } = this.calculateRoundRobin(numberOfProcesses, burstTime, arrivalTime, timeQuantum);

      this.results = this.processes.map((process, index) => ({
        id: process.id,
        burstTime: process.burstTime,
        arrivalTime: process.arrivalTime,
        waitingTime: waitingTime[index],
        turnaroundTime: turnaroundTime[index],
      }));

      this.totalWaitingTime = this.calculateTotal(waitingTime);
      this.totalTurnaroundTime = this.calculateTotal(turnaroundTime);
      this.averageWaitingTime = this.calculateAverage(waitingTime);
      this.averageTurnaroundTime = this.calculateAverage(turnaroundTime);

      this.ganttBars = ganttBars;
    },
    calculateRoundRobin(numberOfProcesses, burstTime, arrivalTime, timeQuantum) {
      const remainingBurstTime = [...burstTime];
      const waitingTime = Array(numberOfProcesses).fill(0);
      const turnaroundTime = Array(numberOfProcesses).fill(0);
      const completionTime = Array(numberOfProcesses).fill(0);
      const ganttBars = [];

      let currentTime = 0;
      let queue = [];
      let index = 0;

      while (queue.length > 0 || index < numberOfProcesses) {
        while (index < numberOfProcesses && arrivalTime[index] <= currentTime) {
          queue.push(index);
          index++;
        }

        if (queue.length > 0) {
          const currentProcess = queue.shift();
          const startTime = currentTime;
          const execTime = Math.min(timeQuantum, remainingBurstTime[currentProcess]);

          remainingBurstTime[currentProcess] -= execTime;
          currentTime += execTime;

          ganttBars.push({
            id: String.fromCharCode(65 + currentProcess), // Convert to alphabetical order
            start: startTime,
            end: currentTime,
          });

          while (index < numberOfProcesses && arrivalTime[index] <= currentTime) {
            queue.push(index);
            index++;
          }

          if (remainingBurstTime[currentProcess] > 0) {
            queue.push(currentProcess);
          } else {
            completionTime[currentProcess] = currentTime;
            turnaroundTime[currentProcess] = completionTime[currentProcess] - arrivalTime[currentProcess];
            waitingTime[currentProcess] = turnaroundTime[currentProcess] - burstTime[currentProcess];
          }
        } else {
          currentTime++;
        }
      }

      return { waitingTime, turnaroundTime, ganttBars };
    },
    calculateTotal(times) {
      return times.reduce((acc, time) => acc + time, 0);
    },
    calculateAverage(times) {
      return this.calculateTotal(times) / times.length;
    },
    getBarStyle(bar, index) {
  const barWidth = 50; 
  const barHeight = 40; 
  const marginLeft = 0; 
  const marginTop = 20; 
  const ganttWidth = this.ganttWidth;

  const barsPerRow = Math.floor(ganttWidth / (barWidth + marginLeft));
  
  // Ensure at least one bar per row to avoid zero division errors
  const effectiveBarsPerRow = Math.max(barsPerRow, 1);

  // Calculate the row and column for the current bar
  const row = Math.floor(index / effectiveBarsPerRow);
  const col = index % effectiveBarsPerRow;

  // Calculate the position of the bar
  const leftPosition = col * (barWidth + marginLeft);
  const topPosition = row * (barHeight + marginTop);

  return {
    width: `${barWidth}px`,
    height: `${barHeight}px`,
    left: `${leftPosition}px`,
    top: `${topPosition}px`,
    position: 'absolute',
  };
}

  },
};
</script>

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
  gap: 20px;
  background: white;
  box-shadow: 0px 43px 85px 34px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 50px;
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
  border: 1px solid black;
  text-align: center;
  padding: 10px;
}
.gantt {
  width: 100%;
}
.gantt-chart {
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
}
.gantt-bar-label {
  flex-grow: 1;
  text-align: center;
}
.gantt-bar-start,
.gantt-bar-end {
  position: absolute;
  bottom: -20px;
}
.gantt-bar-start {
  left: 0;
}
.gantt-bar-end {
  right: 0;
}
</style>
