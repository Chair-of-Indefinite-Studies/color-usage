;(function(ns, color, undefined){
    "use strict";

    var TrackRecord = function(index){
	this.index = index;
	this.usage = 0;
    };
    TrackRecord.prototype.incrementUsage = function(){
	this.usage++;
    };

    function toData(entry){
	var record = this.trackedEntries[entry];
	return { 'entry': entry, 'index': record.index, 'usage': record.usage };
    };
    function toEntry(data){
	return data.entry
    };

    var Model = color.Usage = function(){
	ns.Observable.call(this);
	this.count = 0;
	this.trackedEntries = {};
    };
    Model.prototype = Object.create(ns.Observable.prototype);
    Model.prototype.constructor = Model;
    Model.prototype.register = function(entry){
	var record = this.trackedEntries[entry] = (this.trackedEntries[entry] || new TrackRecord(this.count++));
	record.incrementUsage();
	this.signal('registered', entry, record.index, record.usage);

    };
    Model.prototype.entries = function(sorter){
	sorter = sorter || function(a, b){ return a.index - b.index };
	return Object.keys(this.trackedEntries)
	    .map(toData.bind(this))
	    .sort(sorter)
	    .map(toEntry);
    };
})(ns, window.color = window.color || {})
