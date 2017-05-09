class LandingController < ApplicationController
  layout false
  def index
    @donor = Donor.new
  end
end
