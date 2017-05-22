class AddDonorRefToDonations < ActiveRecord::Migration
  def change
    add_reference :donations, :donor, index: true, foreign_key: true
  end
end
