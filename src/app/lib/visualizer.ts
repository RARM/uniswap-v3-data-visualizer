/**
 * @file visualizer.ts
 * @description This file contains the Visualizer class which controls the logic
 * to retrieve data, transform it, and pass it to the UI Controller for
 * rendering.
**/

/**
 * Class representing a Visualizer.
 * @class
**/
export default class Visualizer {
  /**
   * Create a Visualizer.
   * @constructor
  **/
  constructor() {}

  /**
   * Get the list of visualizations.
   * @returns {Array<Object>} An array of visualization objects.
   */
  getVisualizations(): Array<Object> {
    return [
      {
        name: "Liquidity",
        description: "Liquidity visualizations", 
      }
    ]
  }
}