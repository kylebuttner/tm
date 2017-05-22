class CreateOffenses < ActiveRecord::Migration
  def change
    create_table :offenses do |t|
      t.date :date
      t.string :source
      t.integer :count

      t.timestamps null: false
    end
  end
end
