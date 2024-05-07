cd frontend
npm run build
cd ..
rm -R backend/public
cp -R frontend/build backend/public
vercel deploy --prod