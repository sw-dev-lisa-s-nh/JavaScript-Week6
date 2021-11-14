// imports the chai expect method
var expect = chai.expect;

// takes a "name", and a function that sets up the test
describe('MyWeek6Functions', function() {
    describe('#doSomething', function() {
        it('should concatenate the two parameters', function() {
            // actual call to function
            var x = doSomething("Hello", 5);
            expect(x).to.equal('Hello5');
        });

        it('should throw an error if first parameter is not a string', function() {
            // wrapped in an expect, because we expect it to throw an error
            expect(function() {
                doSomething(5,5);
            }).to.throw(Error);
        });
    });

});