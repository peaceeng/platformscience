const Munkres = require("munkres-js");
export const calculateVowels = (str) => {
  const count = str.match(/[aeiou]/gi)?.length;
  return count ?? 0;
};
export const calculateConsonants = (str) => {
  const count = str.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length;
  return count ?? 0;
};
const getSuitabilityScore = (driver, destination) => {
  const driverLength = driver.length;
  const destinationLength = destination.split(",")[0].length;

  // Calculate base suitability score
  let baseSS;
  if (destinationLength % 2 === 0) {
    baseSS = calculateVowels(driver) * 1.5;
  } else {
    baseSS = calculateConsonants(driver);
  }

  // Check for common factors
  const hasCommonFactors = (a, b) => {
    for (let i = 2; i <= Math.min(a, b); i++) {
      if (a % i === 0 && b % i === 0) {
        return true;
      }
    }
    return false;
  };

  // Increase suitability score if common factors exist
  const ss = hasCommonFactors(driverLength, destinationLength)
    ? baseSS * 1.5
    : baseSS;

  return ss;
};
export const assignDestinationsToDrivers = (drivers, destinations) => {
  const costMatrix = [];

  // Generate the cost matrix
  for (const destination of destinations) {
    const row = [];
    for (const driver of drivers) {
      const suitabilityScore = getSuitabilityScore(driver, destination);
      const cost = -suitabilityScore; // Negate the suitability score to convert it into a cost
      row.push(cost);
    }
    costMatrix.push(row);
  }

  // Apply the Munkres algorithm to find the optimal assignment
  const indexes = new Munkres(costMatrix);
  console.log(costMatrix);

  const assignedPairs = [];
  let totalSS = 0;

  // Process the assigned indexes and calculate the total suitability score
  for (const [destinationIndex, driverIndex] of indexes) {
    const destination = destinations[destinationIndex];
    const driver = drivers[driverIndex];
    const ss = getSuitabilityScore(driver, destination);
    assignedPairs.push({ destination, driver, ss });
    totalSS += ss;
  }

  return { totalSS, assignedPairs };
};
