const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
  constructor(position)
   {
     this.position=position;
     this.mode='NORMAL';
     this.generatorWatts=110;
   }
  receiveMessage (message)
  {
    let results = [];
    for (let command of message.commands)
    {
      if (command.commandType === "MOVE"){

        if(this.mode=== "LOW_POWER"){
          results.push({completed : false});
        } else {
          this.position = command.value;
          results.push({completed : true});
        }
      }
    if (command.commandType === "STATUS_CHECK"){
      results.push({ completed : true, roverStatus : {mode : this.mode , generatorWatts : this.generatorWatts, position :this.position}
     });
    }  

    if (command.commandType === "MODE_CHANGE"){
      this.mode = command.value ;
      results.push({completed : true});
    }
  }

  return { message: message.name , results}

}
}
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
/*let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382); //Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);*/

module.exports = Rover;


