const CHICKEN_SAFE_TEMP = 165;
const BEEF_RARE_SAFE_TEMP = 125;
const BEEF_MEDIUM_SAFE_TEMP = 135;
const BEEF_WELL_SAFE_TEMP = 155;


/**
 * Determines whether meat temperature is high enough
 * @param {string} kind 
 * @param {number} internalTemp 
 * @param {string} doneness
 * @returns {boolean} isCooked
 */
const foodIsCooked = function(kind, internalTemp, doneness) {  
  if(kind === "chicken") {
    return (internalTemp >= CHICKEN_SAFE_TEMP)
  }

  else if(kind === "beef") {
    if(doneness === "rare") {
      return (internalTemp >= BEEF_RARE_SAFE_TEMP)
    }

    else if(doneness === "medium") {
      return (internalTemp >= BEEF_MEDIUM_SAFE_TEMP)
    }

    else if(doneness === "well") {
      return (internalTemp >= BEEF_WELL_SAFE_TEMP)
    }
  }

  else {
    console.log("Not beef or chicken.");
  }

}

// Test function
console.log(foodIsCooked('chicken', 90)); // should be false
console.log(foodIsCooked('chicken', 190)); // should be true
console.log(foodIsCooked('beef', 138, 'well')); // should be false
console.log(foodIsCooked('beef', 138, 'medium')); // should be true
console.log(foodIsCooked('beef', 138, 'rare')); // should be true