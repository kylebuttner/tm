class Donor < ActiveRecord::Base
  has_many :donations, dependent: :destroy

  before_create :generate_token

  protected

  def generate_token
    self.token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless Donor.exists?(token: random_token)
    end
  end
end
