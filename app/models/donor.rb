class Donor < ActiveRecord::Base
  has_many :donations, dependent: :destroy
end
