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
    });
});
