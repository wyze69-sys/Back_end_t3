
import fs from 'fs';
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";

/**
 * This class handles the race results management system.
 */
export class RaceResultsService {
  /**
   * The list of race results.
   * @type {Array<RaceResult>}
   * @private
   */
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  /**
   * Adds a new race result to the race list.
   * @param {RaceResult} result - The race result.
   */
  addRaceResult(result) {
    this._raceResults.push(result);
  }

  /**
   * Saves the race results list to a JSON file.
   * @param {string} filePath - Path where data should be saved.
   */
  saveToFile(filePath) {
    try {
      const data = JSON.stringify(this._raceResults, null, 2);
      fs.writeFileSync(filePath, data, "utf8");
      console.log("Race results saved!");
    } catch (error) {
      console.error("Error saving file:", error.message);
    }
  }

  /**
   * Loads the race results list from a JSON file.
   * @param {string} filePath - Path to load data from.
   * @returns {boolean} True if loading was successful.
   */
  loadFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      this._raceResults = JSON.parse(data);
      console.log("Race results loaded!");
      return true;
    } catch (error) {
      console.error("Error loading file:", error.message);
      return false;
    }
  }

  /**
   * Retrieves the race time for a given participant and sport.
   * @returns {Duration|null}
   */
  getTimeForParticipant(participantId, sport) {
    const result = this._raceResults.find(
      race => race.participant_id === participantId && race.sport === sport
    );
    // Convert plain JSON object back to Duration instance
    return result ? new Duration(result.time._totalSeconds) : null;
  }

  /**
   * Computes the total time for a given participant.
   */
  getTotalTimeForParticipant(participantId) {
    const participantResults = this._raceResults.filter(
      race => race.participant_id === participantId
    );

    let total = new Duration(0);
    participantResults.forEach(result => {
      total = total.plus(new Duration(result.time._totalSeconds));
    });

    return total;
  }
}