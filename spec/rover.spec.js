const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

it ("constructor sets position and default values for mode and generatorWatts",function(){
  let rover = new Rover(500);
  expect(rover.position).toEqual(500);
  expect(rover.generatorWatts).toEqual(110);
});

it ("response returned by receiveMessage contains name of message",function(){
  let msg =new Message("Test Eight",[]);
  let rover = new Rover (500);
  //let response = rover.receiveMessage(message);
  expect(rover.receiveMessage(msg).message).toEqual(msg.name);
});

it ("response returned by receiveMessage includes two results if two commands are sent in the message" , function(){
  let rover = new Rover (500);
  let commands = [new Command('STATUS_CHECK',''), new Command('STATUS_CHECK','')];
  let msg = new Message("Test Nine",commands);
  expect(rover.receiveMessage(msg).results.length).toEqual(2)
});
it("responds correctly to status check command",function(){
  let rover = new Rover (500);
  let commands = [new Command('STATUS_CHECK', '')];
  let msg = new Message("TEST Ten",commands); 
  let response=rover.receiveMessage(msg);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(500);
});
  
it ("responds correctly to mode change command",function(){
  let rover = new Rover (500);
  let commands = [new Command('MODE_CHANGE','LOW_POWER')];
  let msg = new Message("Test Eleven",commands);
  expect (rover.receiveMessage(msg).results[0].completed).toBeTrue();
  expect (rover.mode).toEqual("LOW_POWER");
});

it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
  let rover = new Rover (500);
  rover.mode = "LOW_POWER";
  let commands = [new Command('MOVE',87382098)];
  let msg = new Message("Test Twelve",commands);
  expect (rover.receiveMessage(msg).results[0].completed).toBeFalse();

});
it("responds with position for move command",function(){
  let rover = new Rover (500);
  let commands = [new Command ('MOVE',87382098)];
  let msg = new Message ("Test Thirteen",commands);
  rover.receiveMessage(msg);
  expect (rover.position).toEqual(msg.commands[0].value);
  
});

});

