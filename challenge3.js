const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to calculate the taxable amount (basic salary + benefits)
function calculateTaxableAmount(basicSalary, benefits) {
  return basicSalary + benefits;
}

// Function to calculate PAYE based on taxable amount and tax rates
function calculatePAYE(taxableAmount) {
  if (taxableAmount <= 24000) {
    return taxableAmount * 0.1;
  } else if (taxableAmount <= 32333) {
    return (taxableAmount - 24000) * 0.25 + 2400;
  } else if (taxableAmount <= 500000) {
    return (taxableAmount - 32333) * 0.3 + 6983;
  } else if (taxableAmount <= 800000) {
    return (taxableAmount - 500000) * 0.325 + 93283;
  } else {
    return (taxableAmount - 800000) * 0.35 + 238783;
  }
}

// Function to calculate NHIF deduction based on gross pay
function calculateNHIF(grossPay) {
  const nhifRanges = [
    // Define NHIF deduction ranges
    // Format: { min: minimum gross pay, max: maximum gross pay, deduction: NHIF deduction }
    { min: 0, max: 5999, deduction: 150 },
    { min: 6000, max: 7999, deduction: 300 },
    { min: 8000, max: 11999, deduction: 400 },
    { min: 12000, max: 14999, deduction: 500 },
    { min: 15000, max: 19999, deduction: 600 },
    { min: 20000, max: 24999, deduction: 750 },
    { min: 25000, max: 29999, deduction: 850 },
    { min: 30000, max: 34999, deduction: 900 },
    { min: 35000, max: 39999, deduction: 950 },
    { min: 40000, max: Infinity, deduction: 1700 }
  ];

  // Find the appropriate range for the given gross pay
  for (const range of nhifRanges) {
    if (grossPay >= range.min && grossPay <= range.max) {
      return range.deduction;
    }
  }
}

// Function to calculate NSSF contribution based on pensionable pay
function calculateNSSF(pensionablePay) {
  const tierIRate = 0.06;
  const tierIILimit = 18000;
  const tierIILowerRate = 0.06;
  const tierIIUpperRate = 0.05;

  if (pensionablePay <= 6000) {
    return pensionablePay * tierIRate;
  } else if (pensionablePay <= tierIILimit) {
    return tierIILowerRate * pensionablePay;
  } else {
    return (tierIILowerRate * tierIILimit) + (tierIIUpperRate * (pensionablePay - tierIILimit));
  }
}

// Prompt user for input (basic salary and benefits)
rl.question('Enter basic salary: ', (basicSalary) => {
  rl.question('Enter benefits: ', (benefits) => {
    // Convert input to numbers
    const taxableAmount = calculateTaxableAmount(parseFloat(basicSalary), parseFloat(benefits));
     // Calculate PAYE, NHIF, NSSF, gross salary, and net salary
    const payee = calculatePAYE(taxableAmount);
    const nhif = calculateNHIF(taxableAmount);
    const nssf = calculateNSSF(parseFloat(basicSalary));

    const grossSalary = taxableAmount - payee - nhif - nssf;
    const netSalary = grossSalary - nhif - nssf;

    // Display the results
    console.log(`PAYE: ${payee}`);
    console.log(`NHIF: ${nhif}`);
    console.log(`NSSF: ${nssf}`);
    console.log(`Gross Salary: ${grossSalary}`);
    console.log(`Net Salary: ${netSalary}`);

    rl.close();
  });
});