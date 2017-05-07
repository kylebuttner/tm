class CreateDonors < ActiveRecord::Migration
  def change
    create_table :donors do |t|
      t.string :name
      t.string :email
      t.string :postcode
      t.float :pledge

      t.timestamps null: false
    end
  end
end
