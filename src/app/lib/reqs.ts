import { RequirementCheck, RequirementValue } from '@/app/lib/definitions';
import fs from 'fs';
import path from 'path';

export default function checkRequirements(): Array<RequirementCheck> {
  const requirementsDir = path.join(process.cwd(), 'src/app/data-configs/requirements');
  const files = fs.readdirSync(requirementsDir);
  const requirementChecks: Array<RequirementCheck> = [];

  files.forEach(file => {
    const filePath = path.join(requirementsDir, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);
    
    testRequiredField(parsedData, file);
    requirementChecks.push(getRequirement(parsedData));
  });

  // logRequirementsChecks(requirementChecks);

  return requirementChecks;
}

function logRequirementsChecks(reqs: RequirementCheck[]): void {
  for (let req of reqs) {
    console.log(`\nRequirement: ${req.name}`);
    console.log(`Description: ${req.description}`);
    for (let value of req.values) {
      console.log(`\tName: ${value.name}`);
      console.log(`\tDescription: ${value.description}`);
      console.log(`\tEnvironment: ${value.env}`);
      console.log(`\tExists: ${value.exists}`);
      console.log(`\tValue: ${value.value}`);
    }
  }
}

function testRequiredField(jsonObject: any, filename: string): void {
  const reqAttributes = ['name', 'values'];
  for (const attr of reqAttributes) {
    if (!jsonObject.hasOwnProperty(attr)) {
      throw new Error(`Requirement file "${filename}" is missing a "${attr}" attribute.`);
    }
  }

  const values = jsonObject.values;
  for (const value of values) {
    const valueAttributes = ['name', 'env'];
    for (const attr of valueAttributes) {
      if (!value.hasOwnProperty(attr)) {
        throw new Error(`Requirement value (in file "${filename}") is missing a "${attr}" attribute.`);
      }
    }
  }
}

function getRequirement(jsonObject: any) : RequirementCheck {
  let req: RequirementCheck = {
    name: jsonObject.name,
    values: []
  };

  if (jsonObject.hasOwnProperty('description')) {
    req.description = jsonObject.description;
  }

  for (let value of jsonObject.values) {
    let reqValue: RequirementValue = {
      name: value.name,
      exists: false,
      env: value.env
    };

    if (process.env.hasOwnProperty(value.env)) {
      reqValue.exists = true;
      reqValue.value = process.env[value.env];
    }

    if (jsonObject.hasOwnProperty('description')) {
      reqValue.description = value.description;
    }

    req.values.push(reqValue);
  }

  return req;
}