SMS = new Mongo.Collection('sms');

Template.smsLog.helpers({
  sms: function () {
    return SMS.find({}, {sort: {dateCreated: -1}});
  },
  isIncoming: function () {
    return this.type === "incoming"
  }
});

Template.registerHelper('formatDate', function(date_sent) {
  return moment(date_sent).format('M/DD/YY');
});

Template.registerHelper('formatDay', function(date_sent) {
  return moment(date_sent).format('ddd');
});

Template.registerHelper('formatTime', function(date_sent) {
  return moment(date_sent).format('h:mma');
});




















