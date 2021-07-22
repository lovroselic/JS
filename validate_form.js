function MM_validateForm() { 
    console.log("validating form ...");
    if (document.getElementById) {
        var i, p, q, nm, test, num, min, max, errors = '',
            args = MM_validateForm.arguments;
        for (i = 0; i < (args.length - 2); i += 3) {
            test = args[i + 2];
            val = document.getElementById(args[i]);
            if (val) {
                nm = val.name;
                if ((val = val.value) != "") {
                    if (test.indexOf('isEmail') != -1) {
                        p = val.indexOf('@');
                        if (p < 1 || p == (val.length - 1)) errors += '- ' + nm + ' mora biti pravilen e-mail naslov.\n';
                    } else if (test != 'R') {
                        num = parseFloat(val);
                        if (isNaN(val)) errors += '- ' + nm + ' mora biti število.\n';
                        if (test.indexOf('inRange') != -1) {
                            p = test.indexOf(':');
                            min = test.substring(8, p);
                            max = test.substring(p + 1);
                            if (num < min || max < num) errors += '- ' + nm + ' more biti številka ' + min + ' in ' + max + '.\n';
                        }
                    }
                } else if (test.charAt(0) == 'R') errors += '- ' + nm + ' je obvezno polje.\n';
            }
        }
        if (errors) alert('Prosim, izpolnite obezna polja:\n' + errors);
        document.MM_returnValue = (errors == '');
        console.log("document.MM_returnValue", document.MM_returnValue);
        grecaptcha.reset();
    }
}