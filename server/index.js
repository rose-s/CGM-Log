// Create handle to sms collection in database.
SMS = new Mongo.Collection('sms');

// Configure the Twilio client
var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});
var getTwilioMessages = Meteor.wrapAsync(twilioClient.client.messages.list, twilioClient.client.messages);


function updateMessages () {
  getTwilioMessages(function (err, data) {
    if (err) {
      console.warn("There was an error getting data from twilio", err);
      return
    }
    data.messages.forEach(function (message) {
      if (SMS.find({sid: message.sid}).count() > 0) {
        return;
      }
      if (message.from === Meteor.settings.TWILIO.FROM) {
        message.type = "outgoing";
      } else {
        message.type = "incoming";
      }
      SMS.insert(message);
    });
  });
}

updateMessages();
Meteor.setInterval(updateMessages, 60000);












