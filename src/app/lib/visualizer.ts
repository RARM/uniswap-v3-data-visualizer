/**
 * @file visualizer.ts
 * @description This file contains the Visualizer class which controls the logic
 * to retrieve data, transform it, and pass it to the UI Controller for
 * rendering.
**/

import checkRequirement from "./reqs";
import { RequirementCheck } from "./definitions";
import { UISection } from "@/app/ui/ui-controller";
import ConfigRetrieval from "./configs-retrieval";

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
    this.requirements = checkRequirement();
  }

  /**
   * Get the missing requirements.
   * @returns {Array<RequirementCheck>} An array of requirements still missing.
  **/
  getMissingRequirements(): Array<RequirementCheck> {
    const missingRequirements: Array<RequirementCheck> = [];

    for (const req of this.requirements) {
      const missingValues = req.values.filter(value => !value.exists);
      if (missingValues.length > 0) {
        missingRequirements.push({
          name: req.name,
          description: req.description,
          fulfilled: req.fulfilled,
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
  getVisualizations(): Promise<Array<UISection>> {
    // FIXME: 
    // This method should return the UISection array and an array of
    // configurations that couldn't load (e.g., due to missing requirements).
    return new Promise(async resolve => {
      const ui_descriptions = await (new ConfigRetrieval()).getUISections(this.requirements);
      resolve(ui_descriptions);
    });
  }
}