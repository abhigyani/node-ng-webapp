echo -e "\n\n************************************** STARTING SERVER SETUP **************************************\n"
cd server
rm -rf node_modules package-lock.json
npm cache clear --f
npm install
echo -e "\n************************************** SERVER SETUP COMPLETE **************************************\n"

echo -e "\n\n************************************** STARTING CLIENT SETUP **************************************\n"
cd ../client
rm -rf node_modules package-lock.json
npm cache clear --f
npm install
echo -e "\n************************************** CLIENT SETUP COMPLETE **************************************\n"

echo -e "\n\n************************************** STARTING THE APPLICATION ON LOCALHOST **************************************\n"
npm run startfull
echo -e "\n\n************************************** Application is hosting at http://localhost:4200/ **************************************\n\n"