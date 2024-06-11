# ProgAlgo
## Project Overview
**ProgAlgo** is a project designed to implement and compare various CPU scheduling algorithms. These algorithms are essential for process management in operating systems, determining the order and time allocation for executing processes. The algorithms implemented in this project include:

1. First Come First Serve (FCFS)
2. Round Robin (RR)
3. Short Process First (SPF)

The project calculates and displays the Gantt Chart, Turnaround Time, and Waiting Time for a given set of processes/jobs. It also computes the average waiting time and average turnaround time for the inputted processes.

## Features
- **Gantt Chart Generation:** Visual representation of the scheduling order and execution time of processes.
  
- **Turnaround Time Calculation:** Total time taken for each process from arrival to completion.
  
- **Waiting Time Calculation:** Total time each process spends waiting in the ready queue.
  
- **Average Turnaround Time:** Average of the turnaround times for all processes.
  
- **Average Waiting Time:** Average of the waiting times for all processes.

## Scheduling Algorithms
1. **First Come First Serve (FCFS)**
   - Processes are executed in the order they arrive in the ready queue. This simple scheduling algorithm may cause the "convoy effect," leading to suboptimal average waiting time.

2. **Round Robin (RR)**
   - Each process is assigned a fixed time slice (quantum). Processes are executed in a cyclic order, which helps in managing time-sharing systems but might lead to higher turnaround times.

3. **Shortest Process First (SPF)**
   - Processes with the shortest burst time are executed first. This algorithm can significantly improve the average waiting time but may lead to the "starvation" of longer processes.