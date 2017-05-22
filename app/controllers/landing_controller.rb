class LandingController < ApplicationController
  layout false
  def index
    @donor = Donor.new
  end

  def donate

  end

  def charge
    begin
      Stripe.api_key = ENV["STRIPE_KEY"]
      # Get the payment token submitted by the form:
      token = params[:stripeToken]
      amount = params[:amount]

      # Charge the user's card:
      charge = Stripe::Charge.create(
        :amount => amount,
        :currency => "cad",
        :description => "Example charge",
        :source => token,
      )

      redirect_to share_path
    rescue Stripe::CardError => e
      # Since it's a decline, Stripe::CardError will be caught
      body = e.json_body
      err  = body[:error]

      puts "Status is: #{e.http_status}"
      puts "Type is: #{err[:type]}"
      puts "Charge ID is: #{err[:charge]}"
      # The following fields are optional
      puts "Code is: #{err[:code]}" if err[:code]
      puts "Decline code is: #{err[:decline_code]}" if err[:decline_code]
      puts "Param is: #{err[:param]}" if err[:param]
      puts "Message is: #{err[:message]}" if err[:message]
    rescue Stripe::RateLimitError => e
    # Too many requests made to the API too quickly
    rescue Stripe::InvalidRequestError => e
    # Invalid parameters were supplied to Stripe's API
    rescue Stripe::AuthenticationError => e
    # Authentication with Stripe's API failed
    # (maybe you changed API keys recently)
    rescue Stripe::APIConnectionError => e
    # Network communication with Stripe failed
    rescue Stripe::StripeError => e
    # Display a very generic error to the user, and maybe send
    # yourself an email
    rescue => e
    end
  end

  def share

  end
end
