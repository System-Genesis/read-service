FROM mongo

COPY entities.json /entities.json

# CMD mongoimport --host localhost --port 27017 --db genesis --collection entities --type json  --file /entities.json --jsonArray