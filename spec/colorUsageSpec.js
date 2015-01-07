describe('color', function(){
    it('should exist', function(){
	expect(color).toBeDefined();
    });

    it('should have \'Usage\'', function(){
	expect(color.Usage).toBeDefined();
    });

    describe('Usage', function(){
	var usage;

	beforeEach(function(){
	    usage = new color.Usage();
	});

	it('should create usage objects', function(){
	    expect(usage).toBeDefined();
	});

	it('should register colors', function(){
	    var aColor = 'black';
	    usage.register(aColor);

	    var entries = usage.entries();

	    expect(entries.length).toBe(1);
	    expect(entries).toContain(aColor);
	});

	it('should register colors only once', function(){
	    var aColor = 'black';
	    usage.register(aColor);
	    usage.register(aColor);

	    var entries = usage.entries();

	    expect(entries.length).toBe(1);
	    expect(entries).toContain(aColor);
	});

 	it('should register multiple colors', function(){
	    var aColor = 'black';
	    var otherColor = 'red';
	    usage.register(aColor);
	    usage.register(otherColor);

	    var entries = usage.entries();

	    expect(entries.length).toBe(2);
	    expect(entries).toContain(aColor);
	    expect(entries).toContain(otherColor);
	});

	describe('entries', function(){
	    var history = [
		'black',
		'red',
		'black',
		'red',
		'red'
	    ];

	    beforeEach(function(){
		history.forEach(function(color){ usage.register(color); });
	    });

	    it('should default return entries in registered order', function(){
		var entries = usage.entries();

		expect(entries).toEqual(['black', 'red']);
	    });

	    it('should accept a sort function', function(){
		var entries = usage.entries(function(a, b){
		    return b.usage - a.usage;
		});

		expect(entries).toEqual(['red', 'black']);
	    });
	});

	describe('register', function(){
	    it('should notify of a registration', function(){
		var notified = false;
		usage.on('registered', function(){ notified = true; });

		usage.register('black');

		expect(notified).toBeTruthy();
	    });

	    it('notification should pass entry, index and usage', function(){
		var actualEntry;
		var actualIndex;
		var actualUsage;
		usage.on('registered', function(entry, index, usage){
		    actualEntry = entry;
		    actualIndex = index;
		    actualUsage = usage;
		});

		[
		    { 'expectedColor': 'black', 'expectedIndex': 0, 'expectedUsage': 1 },
		    { 'expectedColor': 'black', 'expectedIndex': 0, 'expectedUsage': 2 },
		    { 'expectedColor': 'red', 'expectedIndex': 1, 'expectedUsage': 1 },
		].forEach(function(data){
		    usage.register(data.expectedColor);

		    expect(actualEntry).toBe(data.expectedColor);
		    expect(actualIndex).toBe(data.expectedIndex);
		    expect(actualUsage).toBe(data.expectedUsage);
		});
	    });
	});
    });
});
