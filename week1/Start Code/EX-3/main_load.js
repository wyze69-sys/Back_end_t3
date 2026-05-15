import { RaceResultsService } from "./service/RaceResultsService.js";

// Initialize RaceResults
const raceResultService = new RaceResultsService();

// Load results from file
raceResultService.loadFromFile("./data/raceScores.json");

// Print the raw results
console.log(raceResultService.raceResults);

// Q5 - Retrieve time for a specific participant and sport
const time1 = raceResultService.getTimeForParticipant("participant1", "swim");
console.log("participant1 swim time:", time1.toString()); // Expected: "2m 30s"

const time2 = raceResultService.getTimeForParticipant("participant1", "run");
console.log("participant1 run time:", time2.toString()); // Expected: "1m 45s"

// Q6 - Compute total time for a participant
const totalTime1 = raceResultService.getTotalTimeForParticipant("participant1");
console.log("participant1 total time:", totalTime1.toString()); // Expected: "4m 15s"

const totalTime2 = raceResultService.getTotalTimeForParticipant("participant2");
console.log("participant2 total time:", totalTime2.toString()); // Expected: "3m 15s"
