(function () {
  var dom = {
      input: $('#input'),
      quoteRadio: $('input[name="quoteRadio"]'),
      output: $('#output')
    }
    , getLeadingWhiteSpaceCount = function (string) {
      for (var result = 0, characterCode = string.charCodeAt(0); 32 == characterCode || characterCode > 8 && characterCode < 14 && characterCode != 11 && characterCode != 12;) {
        characterCode = string.charCodeAt(++result);
      }
      return result;
    }
    , quoteMark = dom.quoteRadio.filter('[checked]').val();

  dom.quoteRadio.on('change', function () {
    quoteMark = $(this).val();

    dom.input.trigger('input');
  });

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

        finalStr += quoteMark + trimmed.replace(new RegExp(quoteMark, 'g'), '\\' + quoteMark) + quoteMark;

        if (i !== inputSplitLastIdx) finalStr += ' +\n';
      }

      dom.output.val(finalStr);
    });
  });
})();