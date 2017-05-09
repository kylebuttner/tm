$(document).ready(function () {

  $('#donation-dropdown').dropdown({
      on: 'hover'
    });

    $('form#pledge').submit(function (e) {
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

    $('form#pledge').form({
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your name'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'email',
              prompt: 'Please enter a valid email'
            }
          ]
        },
        postcode: {
          identifier: 'postcode',
          rules: [
            {
              type: 'regExp',
              value: '^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$',
              prompt: 'Please enter a valid postcode'
            }
          ]
        },
        pledge: {
          identifier: 'pledge',
          rules: [
            {
              type: 'empty',
              prompt: 'Please choose a pledge amount'
            }
          ]
        }
      },
      on: 'blur'
    });

    // Make the form dropdown work
    $('.ui.dropdown').dropdown();
})
