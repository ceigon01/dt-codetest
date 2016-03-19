//extend Core String Object
String.prototype.matchAll = function(regexp) {
    var matches = [];
    this.replace(regexp, function() {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
    });
    return matches.length ? matches :null;
};

(function() {
    var app = angular.module('dealerTrack', []);
    app.controller("OutputController",function(){
        this.output = "";
        this.nonAlphaRegexp = /[^A-Za-z]/;
        this.matchAllNonAlphaRegexp = /[^A-Za-z]/g;
        this.words = [];
        this.modifiedWords = [];
        this.delemiterLocationsInString = [];
        this.delemiterInputsInString = [];

        this.setOutput = function(output){
            this.output = (output)?output:"";
        };

        this.displayOutput = function(){
            var outputString = "";
            var allNonAlphaCharsIndexArray = [];
            var allNonAlphaCharsInputArray = [];
            this.modifiedWords = [];

            if(this.output.matchAll(this.matchAllNonAlphaRegexp) ) {
                var allNonAlphaChars = this.output.matchAll(this.matchAllNonAlphaRegexp);
                for(i = 0; i < allNonAlphaChars.length; i++){
                    allNonAlphaCharsIndexArray.push(allNonAlphaChars[i].index);
                    allNonAlphaCharsInputArray.push(allNonAlphaChars[i][0]);
                }
                this.delemiterLocationsInString = allNonAlphaCharsIndexArray;
                this.delemiterInputsInString = allNonAlphaCharsInputArray;

                this.words = this.output.split(this.nonAlphaRegexp);
                for(var i = 0; i < this.words.length; i++) {
                    this.modifiedWords.push(this.modifyWord(this.words[i]));
                }

                for(i = 0; i < this.modifiedWords.length;i++){
                    outputString += this.modifiedWords[i]+
                        ((this.delemiterInputsInString[i])?this.delemiterInputsInString[i]:"");
                }
            }

            return outputString;
        };
        this.modifyWord = function(output){
            var firstLetter =  output.substr(0,1);
            var lastLetter  =  output.substr(output.length-1,output.length);
            var count = output.length-2;
            return (output.length > 0)?firstLetter+count+lastLetter:"";
        };
    });
    //create <test-output> tag directive to display output
    app.directive("testOutput",function(){
        return {
            restrict: 'E',
            templateUrl: "output.html"
        };
    });
})();