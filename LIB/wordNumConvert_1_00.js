/////////////////////////////////////////////////////word-num_conversion.js ///////////////////////////
/* v 1.00 by LS*/
///////////////////////////////////////////////////////////////////////////////////////////////////////


var CONVERT = {
    wordToNum: function(text) {
        text = text.toLowerCase();
        text = text.trim();
        var N = text.indexOf('ty');
        if (N < 0) {
            var P = text.indexOf('teen');
            if (P < 0) {
                var R = checkExceptions(text);
                if (R > 0) {
                    return R;
                } else {
                    return eniceToNum(text);
                }
            } else {
                var preTeen = text.slice(0, P);
                preTeen = teensToNum(preTeen);
                return preTeen;
            }
        } else {
            var M = text.indexOf('-');
            if (M < 0) {
                return deseticeToNum(text);
            } else {
                var begin = text.slice(0, M);
                var end = text.slice(M + 1);
                begin = deseticeToNum(begin);
                end = eniceToNum(end);
                if (begin < 0 || end < 0) {
                    return -1;
                } else {
                    return begin + end;
                }
            }
        }

        function deseticeToNum(desetica) {
            switch (desetica) {
                case 'twenty':
                    return 20;
                case 'thirty':
                    return 30;
                case 'forty':
                    return 40;
                case 'fifty':
                    return 50;
                case 'sixty':
                    return 60;
                case 'seventy':
                    return 70;
                case 'eighty':
                    return 80;
                case 'ninety':
                    return 90;
                default:
                    return -1;
            }
        }

        function eniceToNum(enica) {
            switch (enica) {
                case 'one':
                    return 1;
                case 'two':
                    return 2;
                case 'three':
                    return 3;
                case 'four':
                    return 4;
                case 'five':
                    return 5;
                case 'six':
                    return 6;
                case 'seven':
                    return 7;
                case 'eight':
                    return 8;
                case 'nine':
                    return 9;
                default:
                    return -1;
            }
        }

        function teensToNum(tinka) {
            switch (tinka) {
                case 'thir':
                    return 13;
                case 'four':
                    return 14;
                case 'fif':
                    return 15;
                case 'six':
                    return 16;
                case 'seven':
                    return 17;
                case 'eigh':
                    return 18;
                case 'nine':
                    return 19;
                default:
                    return -1;
            }
        }

        function checkExceptions(except) {
            switch (except) {
                case 'twelve':
                    return 12;
                case 'eleven':
                    return 11;
                case 'ten':
                    return 10;
                default:
                    return -1;
            }
        }
    },
    numToWord: function(N) {
        var enice = N % 10;
        var desetice = Math.floor(N / 10);
        if (N >= 20) {
            var ena = numToEnice(enice);
            var deset = numToDesetice(desetice);
            var result;
            if (ena === -1) {
                result = deset;
            } else {
                result = deset + "-" + ena;
            }
            return result;
        } else if (N <= 10) {
            if (desetice) {
                return numToDesetice(desetice);
            } else {
                return numToEnice(enice);
            }
        } else if (N === 11) {
            return "eleven";
        } else if (N === 12) {
            return "twelve";
        } else if (N > 12 && N < 20) {
            return numToTeen(N);
        }

        function numToEnice(enica) {
            switch (enica) {
                case 1:
                    return 'one';
                case 2:
                    return 'two';
                case 3:
                    return 'three';
                case 4:
                    return 'four';
                case 5:
                    return 'five';
                case 6:
                    return 'six';
                case 7:
                    return 'seven';
                case 8:
                    return 'eight';
                case 9:
                    return 'nine';
                default:
                    return -1;
            }
        }

        function numToDesetice(desetica) {
            switch (desetica) {
                case 1:
                    return 'ten';
                case 2:
                    return 'twenty';
                case 3:
                    return 'thirty';
                case 4:
                    return 'forty';
                case 5:
                    return 'fifty';
                case 6:
                    return 'sixty';
                case 7:
                    return 'seventy';
                case 8:
                    return 'eighty';
                case 9:
                    return 'ninety';
                default:
                    return -1;
            }
        }

        function numToTeen(teen) {
            switch (teen) {
                case 13:
                    return 'thirteen';
                case 14:
                    return 'fourteen';
                case 15:
                    return 'fifteen';
                case 16:
                    return 'sixteen';
                case 17:
                    return 'seventeen';
                case 18:
                    return 'eighteen';
                case 19:
                    return 'nineteen';
                default:
                    return -1;
            }
        }
    },
    numToOrd: function(enica) {
        switch (enica) {
            case 1:
                return 'first';
            case 2:
                return 'second';
            case 3:
                return 'third';
            case 4:
                return 'fourth';
            case 5:
                return 'fifth';
            case 6:
                return 'sixth';
            case 7:
                return 'seventh';
            case 8:
                return 'eighth';
            default:
                return -1;
        }
    },
    ordToNum: function(enica) {
        switch (enica) {
            case 'first':
                return 1;
            case 'second':
                return 2;
            case 'third':
                return 3;
            case 'fourth':
                return 4;
            case 'fifth':
                return 5;
            case 'sixth':
                return 6;
            case 'seventh':
                return 7;
            case 'eighth':
                return 8;
            default:
                return -1;
        }
    }
};
/////////////////////////////////////////////////////////////////////////