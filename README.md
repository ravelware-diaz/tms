# tms
ednpoint => http://localhost:3000/get-ticket
body => { "id": 5 } menggunakan id vehicle

endpoint => http://localhost:3000/start-loading/1 params id dock
body => { "id": 1 } menggunakan id queue

endpoint => http://localhost:3000/check-out/1 params id dock
body => { "id": 1 } menggunakan id queue