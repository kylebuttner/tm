json.extract! donor, :id, :name, :email, :postcode, :pledge, :created_at, :updated_at
json.url donor_url(donor, format: :json)
