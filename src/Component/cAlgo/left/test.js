  var radiotitle = [];
  $('.eachradiotitle').each(function(i) {
    var title;
    var answerdesc = [];
    var answercode;
    $(this).find("input[type='text']").each(function(i) {
      if (i == 0) {
        title = $(this).val();
      } else {
        answerdesc[i - 1] = $(this).val();
      }
    })
    $(this).find("input[type='radio']").each(function(i) {
      if ($(this).checked) {
        answercode = (this).val();
      }
    })
    radiotitle.push({
      title: title,
      answerdesc: answerdesc,
      answercode: answercode
    });
  })
  console.log(radiotitle);