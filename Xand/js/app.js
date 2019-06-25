$(document).ready(function() {
  $('.contact-form').on('submit', function(e) {
    e.preventDefault();

    var form = $(this);

    var formName = form.attr('name');
    var formId = form.attr('id');

    toggleButton(formId, true);
    var successDiv = $('#' + formId + '-success');
    var errorDiv = $('#' + formId + '-error');

    var data = new FormData();
    data.append('formName', formName);

    var other_data = form.serializeArray();
    $.each(other_data, function(key, input) {
      data.append(input.name, input.value);
    });

    $.ajax({
      type: 'post',
      url: 'process.php',
      data: data,
      contentType: false,
      processData: false,
      success: function() {
        toggleButton(formId, false);
        successDiv.show();
        errorDiv.hide();
        form[0].reset();
      },
      error: function(err) {
        toggleButton(formId, false);
        console.error(err);
        errorDiv.show();
        successDiv.hide();
      }
    });
  });
});

function toggleButton(formId, loading) {
  const submitBtn = $('#' + formId + '-submit-btn');
  if (loading) {
    submitBtn.attr('disabled', 'disabled');
    submitBtn.html('Please wait...');
  } else {
    var resetText = submitBtn.data('text');
    submitBtn.html(resetText);
    submitBtn.attr('disabled', null);
  }
}
