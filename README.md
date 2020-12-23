# Hello Martians!

This is a brain controller for the GPT3 bots we have in our kiosks at Chatsubo, Mars and Venus

***

## To run this project:

**The docker way:** 
* Requires docker and docker-compose
``` 
clone
cd kiosk
docker-compose up
```

**The hard way:**
* Run both locally at the same time
> run frontend
```
cd kiosk/frontend
npm install
npm run start
``` 

> run backend in new terminal
```
cd kiosk/backend
pip3 install -r requirements.txt
python3 app.py
```
***
Made with: 

> flask + react
