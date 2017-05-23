class LandingController < ApplicationController
  layout false
  def index
    @donor = Donor.new
    @feed_items = []

    @feed_items << Donation.last(10)
    @feed_items << Donor.last(10)
    @feed_items.flatten!
    @feed_items = @feed_items.sort_by { |item| item.updated_at }
    @feed_items.reverse!
    @feed_items = @feed_items[0..9] if @feed_items.length > 9
  end

  def donate
    @donor = Donor.find_by(token: params[:token])
    @total_offense_count = Offense.sum(:count)
  end

  def charge
    @donor = Donor.find_by(email: params[:email])

    begin
      Stripe.api_key = ENV["STRIPE_KEY"]
      # Get the payment token submitted by the form:
      token = params[:stripeToken]
      amount = params[:amount]

      # Charge the user's card:
      charge = Stripe::Charge.create(
        :amount => amount,
        :currency => "gbp",
        :description => "donation",
        :source => token,
      )

      @donor.donations.create(total: amount)

      redirect_to root_path(success: true)
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
      p 'rate limit'
    # Too many requests made to the API too quickly
    rescue Stripe::InvalidRequestError => e
      p 'invalid request'
    # Invalid parameters were supplied to Stripe's API
    rescue Stripe::AuthenticationError => e
      p 'auth error'
    # Authentication with Stripe's API failed
    # (maybe you changed API keys recently)
    rescue Stripe::APIConnectionError => e
      p 'api connection'
    # Network communication with Stripe failed
    rescue Stripe::StripeError => e
      p 'stripe'
    # Display a very generic error to the user, and maybe send
    # yourself an email
    rescue => e
      p 'else'
    end
  end

  def share

  end
end
