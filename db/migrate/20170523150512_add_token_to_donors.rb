class AddTokenToDonors < ActiveRecord::Migration
  def change
    add_column :donors, :token, :string
  end
end
