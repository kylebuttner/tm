$(document).ready(function () {

  $('#donation-dropdown').dropdown({
      on: 'hover'
    });

    $('form#pledge').submit(function (e) {
      // e.preventDefault();
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
          identifier: 'donor[name]',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your name'
            }
          ]
        },
        email: {
          identifier: 'donor[email]',
          rules: [
            {
              type: 'email',
              prompt: 'Please enter a valid email'
            }
          ]
        },
        postcode: {
          identifier: 'donor[postcode]',
          rules: [
            {
              type: 'regExp',
              value: '^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$',
              prompt: 'Please enter a valid postcode'
            }
          ]
        },
        pledge: {
          identifier: 'donor[pledge]',
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

    // Stripe
    var stripe = Stripe('pk_test_XlJOPADJ6wOOidNKrJkoIYEP');
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    var style = {
      base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        lineHeight: '24px'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('donation-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
    }

    // Create a token or display an error when the form is submitted.
    var form = document.getElementById('donation-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          stripeTokenHandler(result.token);
        }
      });
    });

})
