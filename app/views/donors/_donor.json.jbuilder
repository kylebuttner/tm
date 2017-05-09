json.extract! donor, :id, :name, :email, :postcode, :pledge, :max, :created_at, :updated_at
json.url donor_url(donor, format: :json)
