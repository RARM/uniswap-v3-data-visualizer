/**
 * @file visualizer.ts
 * @description This file contains the Visualizer class which controls the logic
 * to retrieve data, transform it, and pass it to the UI Controller for
 * rendering.
**/

import checkRequirement from "./reqs";
import { RequirementCheck } from "./definitions";

/**
 * Class representing a Visualizer.
 * @class
**/
export default class Visualizer {
  private requirements: Array<RequirementCheck>;
  
  /**
   * Create a Visualizer.
   * @constructor
  **/
  constructor() {
    this.requirements = checkRequirement()
  }

  /**
   * Get the missing requirements.
   * @returns {Array<RequirementCheck>} An array of requirements still missing.
  **/
  getMissingRequirements(): Array<RequirementCheck> {
    let missingRequirements: Array<RequirementCheck> = [];

    for (let req of this.requirements) {
      let missingValues = req.values.filter(value => !value.exists);
      if (missingValues.length > 0) {
        missingRequirements.push({
          name: req.name,
          description: req.description,
          values: missingValues
        });
      }
    }

    return missingRequirements;
  }

  /**
   * Get the list of visualizations.
   * @returns {Array<Object>} An array of visualization objects.
  **/
  getVisualizations(): Array<Object> {
    return [
      {
        name: "Liquidity",
        description: "Liquidity visualizations", 
      }
    ]
  }
}