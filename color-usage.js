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

    var View = color.UsageView = function(model, container, callback){
        this.model = model;
        this.container = container;
        this.callback = callback || function(){ /* do nothing */ };
        this.registeredColors = {};
        this.model.on('registered', this.register.bind(this));
        this.initialize();
    };
    View.prototype.register = function(entry, index, usage){
        if (!this.registeredColors[entry]) {
            var element = this.registeredColors[entry] = document.createElement('span');
            element.setAttribute('data-entry', entry);
            element.setAttribute('data-index', index);
            element.setAttribute('data-usage', usage);
            this.container.appendChild(element);
            this.callback(element);
        }
        element = this.registeredColors[entry];
        element.setAttribute('data-index', index);
        element.setAttribute('data-usage', usage);
    };
    View.prototype.initialize = function(){
        this.model.entries(function(entry, index){
            this.register(entry, index, 1);
        }.bind(this));
    };
})(ns, window.color = window.color || {})
