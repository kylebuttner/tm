$(document).ready(function () {

  $('#donation-dropdown').dropdown({
      on: 'hover'
    });

    $('#step1 form').submit(function (e) {
      e.preventDefault();
    })

    // Form step transitions
    $('#step1 button[type=submit]').click(function () {
      $('#step1').transition({
        onComplete: function () {
          $('#step2').removeClass('hide');
        }
      });
      $('#step1-icon').removeClass('active');
      $('#step2-icon').addClass('active');
    });

    $('#step2 button[name="skip"], #step2 button[name="next"]').click(function () {
      $('#step2').transition({
        onComplete: function () {
          $('#step3').removeClass('hide');
        }
      });
      $('#step2-icon').removeClass('active');
      $('#step3-icon').addClass('active');
    })
})
