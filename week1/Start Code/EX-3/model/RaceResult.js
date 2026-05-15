/**
 * Represents a single race result for a participant in a given sport.
 */
export class RaceResult {
  /**
   * The unique identifier of the participant.
   * @type {string}
   */
  participant_id;

  /**
   * The type of sport (e.g., "swim", "run").
   * @type {string}
   */
  sport;

  /**
   * The time recorded for this race result.
   * @type {Duration}
   */
  time;

  /**
   * Creates a new RaceResult instance.
   * @param {string} participantId - The participant's unique ID.
   * @param {string} sport - The sport type (e.g., "swim", "run").
   * @param {Duration} time - The recorded duration for this result.
   */
  constructor(participantId, sport, time) {
    this.participant_id = participantId;
    this.sport = sport;
    this.time = time;
  }
}
