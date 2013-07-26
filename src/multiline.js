(function () {
  var dom = {
      input: $('#input'),
      output: $('#output')
    }
    , getLeadingWhiteSpaceCount = function (string) {
      for (var result = 0, characterCode = string.charCodeAt(0); 32 == characterCode || characterCode > 8 && characterCode < 14 && characterCode != 11 && characterCode != 12;) {
        characterCode = string.charCodeAt(++result);
      }
      return result;
    };

  dom.input.on('input', function (e) {
    var finalStr = ''
      , inputSplit = $.trim(dom.input.val()).split('\n')
      , inputSplitLastIdx = inputSplit.length - 1;

    inputSplit.forEach(function (line, i) {
      var trimmed = $.trim(line);

      if (trimmed === '') {
        finalStr += '\n';
      } else {
        for (var idx = 0, len = getLeadingWhiteSpaceCount(line); idx < len; idx++) {
          finalStr += ' ';
        }

        finalStr += "'" + trimmed.replace(/'/g, "\\'") + "'";

        if (i !== inputSplitLastIdx) finalStr += ' +\n';
      }

      dom.output.val(finalStr);
    });
  });
})();