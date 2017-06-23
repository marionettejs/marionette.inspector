define([
  'marionette',
  'backbone.radio',
], function(Marionette, Radio) {

  Radio.connectCommands = function(channelName, commands, context) {
        if (_.isEmpty(commands)) {
            throw new Error('commands cannot be empty');
        }

        var normalizedCommands = Marionette.normalizeMethods(context, commands);
        var channel = Radio.channel(channelName);

        _.each(normalizedCommands, function(fn, eventName) {
            channel.reply(eventName, fn, context);
        });
    };

    Radio.disconnectCommands = function(channelName, commands) {
        if (_.isEmpty(commands)) {
            throw new Error('commands cannot be empty');
        }

        var channel = Radio.channel(channelName);

        _.each(_.keys(commands), function(eventName) {
            channel.stopReplying(eventName);
        });
    };

    Radio.connectEvents = function(channelName, events, context) {
        if (_.isEmpty(events)) {
            throw new Error('events cannot be empty');
        }

        var normalizedEvents = Marionette.normalizeMethods(context, events);
        var channel = Radio.channel(channelName);

        _.each(normalizedEvents, function(fn, eventName) {
            channel.on(eventName, fn, context);
        });
    };

    Radio.disconnectEvents = function(channelName, events, context) {
        if (_.isEmpty(events)) {
            throw new Error('events cannot be empty');
        }

        var normalizedEvents = Marionette.normalizeMethods(context, events);
        var channel = Radio.channel(channelName);

        _.each(normalizedEvents, function(fn, eventName) {
            channel.off(eventName, fn, context);
        });
    };

    Radio.connectRequests = function(channelName, requests, context) {
        if (_.isEmpty(requests)) {
            throw new Error('events cannot be empty');
        }

        var normalizedRequests = Marionette.normalizeMethods(context, requests);
        var channel = Radio.channel(channelName);

        _.each(normalizedRequests, function(fn, eventName) {
            channel.reply(eventName, fn, context);
        });
    };

    Radio.disconnectRequests = function(channelName, requests) {
        if (_.isEmpty(requests)) {
            throw new Error('requests cannot be empty');
        }

        var channel = Radio.channel(channelName);

        _.each(_.keys(requests), function(eventName) {
            channel.stopReplying(eventName);
        });
    };

    return Radio;
});
