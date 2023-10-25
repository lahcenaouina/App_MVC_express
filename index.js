const fs = require('fs')
const path = require('path')
const readline = require('readline')


const PATH_TODO_JSON = path.join(__dirname, 'Data', 'todos.json');

const rl = readline.createInterface({
    input: process.stdin, output: process.stdout
});

// rl.question('HI, (TO ADD: 1) (TO RM: 2) (TO UPDATE: 3) (TO LIST: 5): ', (answer) => {
//     if (answer === '1') {
//         console.log("ADDING")
//
//         rl.question('Please enter name task : ', (taskName) => {
//             fs.readFile(PATH_TODO_JSON, 'utf8', (err, data) => {
//                 let PrevData = JSON.parse(data);
//                 let UpdatedData = [...PrevData, {id: PrevData.length, task: taskName}]
//                 fs.writeFile(PATH_TODO_JSON, JSON.stringify(UpdatedData), (err) => {
//                     if (err) throw err;
//                     console.log('Task Added successfully')
//                 })
//             })
//         });
//
//
//     } else if (answer === '2') {
//         console.log("REMOVING")
//         rl.question('Please enter id to rem : ', (id ) => {
//             fs.readFile(PATH_TODO_JSON, 'utf8', (err, data) => {
//                 let PrevData = JSON.parse(data);
//
//                 let updateddata = PrevData.filter(task => task.id !== parseInt(id))
//
//                 fs.writeFile(PATH_TODO_JSON, JSON.stringify(updateddata), (err) => {
//                     if (err) throw err;
//                     console.log("removed ")
//                 })
//             })
//         });
//     } else if (answer === '3') {
//         console.log("UPDATING")
//
//         rl.question('Please enter id task to update : ', (id ) => {
//             rl.question('New Task Name : ' , (taskName) => {
//
//                 fs.readFile(PATH_TODO_JSON, 'utf8', (err, data) => {
//                     let PrevData = JSON.parse(data);
//                     PrevData.forEach((e,i)=> e.id === parseInt(id) ? PrevData[i].task = taskName : null )
//
//
//                     fs.writeFile(PATH_TODO_JSON, JSON.stringify(PrevData), (err) => {
//                         if (err) throw err;
//                         console.log("removed ")
//                     })
//                 })
//             })
//         });
//
//     } else if (answer === '5') {
//         console.log("LISTING")
//         fs.readFile(PATH_TODO_JSON, 'utf8', (err, data) => {
//             console.log(JSON.parse(data))
//         })
//
//     } else {
//         console.log("Invalid option")
//     }
// });

process.on('uncaughtException' , (err) => {
    console.log("HIHI" + err);
})


// fs.rename('lahcen.txt' , 'lahceniko.txt' ,(e) => console.log(e))

// fs.appendFile(path.join(__dirname , 'Data' , 'lahceniko.txt') ," oma frend otoxic otoxic and so rode in " , (e) => e)

