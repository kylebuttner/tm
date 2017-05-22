class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.float :total

      t.timestamps null: false
    end
  end
end
