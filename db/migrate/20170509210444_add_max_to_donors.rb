class AddMaxToDonors < ActiveRecord::Migration
  def change
    add_column :donors, :max, :float
  end
end
