/**
 * Inplement a class that imiplements the following functionality of the Phone class:
 * 1. Has a constructor that defines a constant for the class that is set to a value of 'connected'.
 * 2. Has a Connected getter that defines a constant for the class that is set to a value of 'connected'.
 * 3. Has a connect method that takes a variable number of values. The method joins the values together into a string that is separated by a '-' character and attempts to match it with the regular expression given in the constructor. If it fails it throws an exception. Otherwise it passes back an object that has an id and result property, where the result is set to Phone.Connected.
 */
class Phone {
    constructor(regEx) {
      // Implement the constructor
    }
  
    // Implement the Connected constant getter
  
    connect(...numberParts) {
      // Return an object if the number matches the regEx
      // Otherwise thrown an exception
    }
  }
  
  const phone = new Phone(/\d{3}-\d{3}-\d{4}/);
  
  const calls = [
    { name: 'Li', number: ['333', '333', '3333'] },
    { name: 'Juan', number: ['222', '222', '2222'] },
    { name: 'Meg', number: ['8E26F', '811F'] },
  ];
  
  for (const call of calls) {
    try {
      const { result } = phone.connect(...call.number);
      if (result === Phone.Connected) {
        console.log(`called ${call.name}`);
      }
    } catch (ex) {
      console.log(`${ex.message} for ${call.name}`);
    } finally {
      console.log('done');
    }
  }